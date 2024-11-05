import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

interface ErrorsProtocol {
    message: string;
    campo: string;
}

export class ValidationUser {
    public constructor() {}

    public createdUsers(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void | Response<string, Record<string, string>> {
        try {
            const { name, email, password, number_phone } = req.body;

            const errors: Array<ErrorsProtocol> = [];

            const fieldsToValidate = [
                { value: name, fieldName: 'Nome' },
                { value: email, fieldName: 'Email' },
                { value: password, fieldName: 'Senha' },
                { value: number_phone, fieldName: 'Número do Celular' },
            ];

            fieldsToValidate.forEach((field) => {
                ValidationUser.validateEmptyField(field.value, field.fieldName, errors);
            });

            if (name.length < 3) {
                errors.push({
                    message: 'Campo nome não pode ser menor que 3 caracteres',
                    campo: 'Nome',
                });
            }

            if (email.length < 3) {
                errors.push({
                    message: 'Campo email não pode ser menor que 3 caracteres',
                    campo: 'Email',
                });
            }
            if (password.length < 3) {
                errors.push({
                    message: 'Campo Senha não pode ser menor que 6 caracteres',
                    campo: 'Senha',
                });
            }

            if (number_phone && !validator.isMobilePhone(number_phone, 'pt-BR')) {
                errors.push({ message: 'Número inválido', campo: 'Número de Telefone' });
            }

            if (!validator.isEmail(email)) {
                errors.push({ message: 'Email invalido', campo: 'E-mail' });
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            return next();
        } catch (error) {
            next(error);
        }
    }

    public createdUserBusiness(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void | Response<string, Record<string, string>> {
        try {
            const { name, email, name_business, password, number_phone, segment_type_id } =
                req.body;

            const errors: Array<ErrorsProtocol> = [];

            const fieldsToValidate = [
                { value: name, fieldName: 'Nome' },
                { value: email, fieldName: 'Email' },
                { value: name_business, fieldName: 'Nome do negócio' },
                { value: password, fieldName: 'Senha' },
                { value: number_phone, fieldName: 'Número do Celular' },
            ];

            fieldsToValidate.forEach((field) => {
                ValidationUser.validateEmptyField(field.value, field.fieldName, errors);
            });

            if (name.length < 3) {
                errors.push({
                    message: 'Campo nome não pode ser menor que 3 caracteres',
                    campo: 'Nome',
                });
            }

            if (!segment_type_id) {
                errors.push({
                    message: 'Campo ID do segmento não pode está vazio',
                    campo: 'ID do segmento',
                });
            }

            if (email.length < 3) {
                errors.push({
                    message: 'Campo email não pode ser menor que 3 caracteres',
                    campo: 'Email',
                });
            }
            if (name_business.length < 3) {
                errors.push({
                    message: 'Campo nome do negócio não pode ser menor que 3 caracteres',
                    campo: 'Nome do negócio',
                });
            }
            if (password.length < 3) {
                errors.push({
                    message: 'Campo Senha não pode ser menor que 6 caracteres',
                    campo: 'Senha',
                });
            }

            if (number_phone && !validator.isMobilePhone(number_phone, 'pt-BR')) {
                errors.push({ message: 'Número inválido', campo: 'Número de Telefone' });
            }

            if (!validator.isEmail(email)) {
                errors.push({ message: 'Email invalido', campo: 'E-mail' });
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
