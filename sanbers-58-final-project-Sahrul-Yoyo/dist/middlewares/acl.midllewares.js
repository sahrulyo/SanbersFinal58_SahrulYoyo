"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        next();
    };
};
exports.default = authorizeRoles;
//# sourceMappingURL=acl.midllewares.js.map