import { Request, Response, NextFunction } from "express";
import { IReqUser } from "@/utils/interfaces";

// const authorizeRoles = (roles: string[]) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//       const userRoles = (req as IReqUser).user?.roles;
  
//       if (!userRoles || !userRoles.some(userRole => roles.includes(userRole))) {
//         return res.status(403).json({
//           message: "Forbidden",
//         });
//       }
  
//       next();
//     };
//   };
  
//   export default authorizeRoles;
const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as IReqUser).user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};

export default authorizeRoles;