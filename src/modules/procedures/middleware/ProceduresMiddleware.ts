import { NextFunction, Request, Response } from 'express';

interface ErrorsProtocol {
    message: string;
    campo: string;
}
export class ProceduresMiddleware {
    public createdProcedure(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void | Response<string> {
        try {
            const { name, description, duration, price } = req.body;

            const errors: Array<ErrorsProtocol> = [];

            const fieldsToValidate = [
                { value: name, fieldName: 'Nome' },
                { value: description, fieldName: 'Descrição' },
                { value: duration, fieldName: 'Duração' },
                { value: price, fieldName: 'Preço' },
            ];

            fieldsToValidate.forEach((field) => {
                ProceduresMiddleware.validateEmptyField(field.value, field.fieldName, errors);
            });

            if (name.length < 3) {
                errors.push({
                    message: 'Campo nome não pode ser menor que 3 caracteres',
                    campo: 'Nome',
                });
            }

            if (typeof duration !== 'number' || duration <= 0) {
                errors.push({
                    message: 'Campo Duração deve ser um número',
                    campo: 'Duração',
                });
            }

            if (typeof price !== 'number' || price < 0) {
                errors.push({
                    message: 'Campo Preço deve ser um número não negativo',
                    campo: 'Preço',
                });
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            return next();
        } catch (error) {
            next(error);
        }
    }

    public createdCategoryforProcedure(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void | Response<string> {
        try {
            const { name } = req.body;

            const errors: Array<ErrorsProtocol> = [];

            if (!name) {
                errors.push({
                    message: 'Campo nome não pode ficar vazio',
                    campo: 'Nome',
                });
            }

            if (name.length < 3) {
                errors.push({
                    message: 'Campo nome não pode ser menor que 3 caracteres',
                    campo: 'Nome',
                });
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            return next();
        } catch (error) {
            next(error);
        }
    }

    private static validateEmptyField(
        value: string,
        fieldName: string,
        errors: ErrorsProtocol[],
    ): void {
        if (value === '') {
            errors.push({
                message: `Campo ${fieldName} não pode ficar vazio`,
                campo: fieldName,
            });
        }
    }
}
