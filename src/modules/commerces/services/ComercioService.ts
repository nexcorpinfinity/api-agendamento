/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComercioBodyProps } from '../interface/BodyRequest';
import { CommerceRepository } from '../repository/ComercioRepository';

export default class ComercioService {
    private commerceRepository: CommerceRepository;

    constructor() {
        this.commerceRepository = new CommerceRepository();
    }

    async criarComercio(userData: ComercioBodyProps) {
        if (userData.client_id === undefined) return 'retornou undefined';

        const user = await this.commerceRepository.createCommerce(userData.comercio_name, userData.cpf_cnpj, userData.endereco, userData.client_id);

        return user;
    }
}
