import { Request, Response, NextFunction } from "express";
declare const authorizeRoles: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authorizeRoles;
//# sourceMappingURL=acl.midllewares.d.ts.map