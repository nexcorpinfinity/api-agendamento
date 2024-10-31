/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { IBusinessRepository } from '../../business/interface/IBusinessRepository';
import { IBusinessSegmentsTypesRepository } from '../../business/interface/IBusinessSegmentsTypesRepository';
import { ISegmentsTypesRepository } from '../../segments/intefaces/ISegmentsTypesRepository';
import { Permissions } from '../interfaces/EnumPermissions';
// import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IUserService } from '../interfaces/IUserService';

export class UserService implements IUserService {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly businessRepository: IBusinessRepository,
        private readonly segmentTypesRepository: ISegmentsTypesRepository,
        private readonly businessSegmentsTypesRepository: IBusinessSegmentsTypesRepository,
    ) {}

    public async createUserClient(
        name: string,
        email: string,
        password: string,
        photo: string,
        number_phone: string,
    ): Promise<{ id: string; name: string; email: string } | Error> {
        try {
            const hashPassword = this.generateHashPassWord(String(password));

            const apiKey = this.generateApiKey();

            const verifyExistEmail = await this.userRepository.verifyEmailExists(email);

            if (verifyExistEmail === true) {
                return new Error('Email já existe');
            }

            const user = await this.userRepository.createUser(
                name,
                email,
                hashPassword,
                photo,
                number_phone,
                apiKey,
                Permissions.Client,
            );

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async createUserBusiness(
        name: string,
        email: string,
        name_business: string,
        password: string,
        photo: string,
        number_phone: string,
        segment_type_id: string,
    ): Promise<{ id: string; name: string; email: string } | Error> {
        // Define o tipo de retorno
        try {
            const hashPassword = this.generateHashPassWord(String(password));
            const apiKey = this.generateApiKey();

            const verifyExistEmail = await this.userRepository.verifyEmailExists(email);
            if (verifyExistEmail === true) {
                return new Error('Email já existe');
            }

            const verifyExistSegmentTypes =
                await this.segmentTypesRepository.verifySegmentTypeExists(segment_type_id);
            if (verifyExistSegmentTypes === false) {
                return new Error('Segmento não existe');
            }

            const userResult = await this.userRepository.createUser(
                name,
                email,
                hashPassword,
                photo,
                number_phone,
                apiKey,
                Permissions.Costumer,
            );

            if (userResult instanceof Error) {
                console.error('Erro ao criar usuário:', userResult.message);
                return userResult;
            }

            const { id } = userResult;

            if (userResult) {
                const resultBusiness = await this.businessRepository.createBusiness(
                    name_business,
                    String(id),
                );

                if (resultBusiness instanceof Error) {
                    return new Error('Erro ao criar comercio');
                }

                const idBusiness = resultBusiness.id;

                if (idBusiness) {
                    const createBondBusiAndSeg =
                        await this.businessSegmentsTypesRepository.createBondBusinessSegmentsTypes(
                            idBusiness,
                            segment_type_id,
                        );

                    if (createBondBusiAndSeg instanceof Error) {
                        console.error('Erro ao criar vínculo do comércio');
                        return new Error('Erro ao criar vínculo do comércio');
                    }
                }
            }

            return userResult;
        } catch (error) {
            console.error('Erro em createUserBusiness:', error);
            return new Error('Erro desconhecido ao criar usuário e negócio');
        }
    }

    public async createUserAdmin(
        name: string,
        email: string,
        password: string,
        photo: string,
        number_phone: string,
    ): Promise<{ id: string; name: string; email: string } | Error> {
        try {
            const hashPassword = this.generateHashPassWord(String(password));

            const apiKey = this.generateApiKey();

            const verifyExistEmail = await this.userRepository.verifyEmailExists(email);

            if (verifyExistEmail === true) {
                return new Error('Email já existe');
            }

            const user = await this.userRepository.createUser(
                name,
                email,
                hashPassword,
                photo,
                number_phone,
                apiKey,
                Permissions.Admin,
            );

            return user;
        } catch (error) {
            emitConsole(error);
            throw error;
        }
    }

    private generateHashPassWord(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    }

    private generateApiKey(): string {
        return uuidv4();
    }
}
