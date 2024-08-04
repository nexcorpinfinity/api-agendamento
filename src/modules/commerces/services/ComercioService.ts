/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComercioBodyProps } from '../interface/BodyRequest';
import ComercioRepository from '../repository/ComercioRepository';

export default class ComercioService {
    async criarComercio(userData: ComercioBodyProps) {
        if (userData.client_id === undefined) return 'retornou undefined';

        const user = await ComercioRepository.createCommerce(userData.comercio_name, userData.cpf_cnpj, userData.endereco, userData.client_id);

        return user;
    }
}
