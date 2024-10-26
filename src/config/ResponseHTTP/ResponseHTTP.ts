/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response } from 'express';

export class ResponseHandler {
    public static success(res: Response, statusCode: number, data: any, message: string) {
        return res.status(statusCode).json({
            status: statusCode,
            message: message,
            resource: data,
        });
    }

    public static error(
        res: Response,
        statusCode: number,
        message: string = 'Erro ao processar requisição',
    ) {
        return res.status(statusCode).json({
            status: statusCode,
            message,
        });
    }
}
