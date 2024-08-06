import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../utils/env";
import { IReqUser } from "../utils/interfaces";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const [prefix, accessToken] = token.split(" ");

  if (prefix !== "Bearer" || !accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const user = jwt.verify(accessToken, SECRET) as {
      roles: string[]; id: string; role: string 
};

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    (req as IReqUser).user = {
      id: user.id,
      role: user.role,
      roles: user.roles,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default authMiddleware;