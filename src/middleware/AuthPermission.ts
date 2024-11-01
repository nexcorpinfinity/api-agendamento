import { Request, Response, NextFunction } from 'express';

import { ResponseHandler } from '../config/ResponseHTTP/ResponseHTTP';
import { Permissions } from '../modules/users/interfaces/EnumPermissions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const authPermission = (requiredPermissions: string[]) => {
    return (req: Request, res: Response, next: NextFunction): Response<void> | void => {
        const permissions = res.locals.user.permission;

        try {
            if (permissions.includes(Permissions.Admin)) {
                return next();
            }

            const hasPermission = requiredPermissions.some((permission) =>
                permissions.includes(permission),
            );

            if (hasPermission) {
                return next();
            } else {
                return ResponseHandler.error(res, 403, 'Acesso negado');
            }
        } catch (error) {
            return ResponseHandler.error(res, 403, 'Forbidden');
        }
    };
};
