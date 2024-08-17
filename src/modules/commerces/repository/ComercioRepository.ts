import { User } from '../../users/entities/User';
import { Role } from '../../users/Permissions';

import { Comercio } from '../entities/Commerce';

class CommerceRepository {
    async createCommerce(comercio_name: string, cpf_cpnj: string, endereco: string, usuario_id: string) {
        try {
            const objRecebido = { comercio_name, cpf_cpnj, endereco, usuario_id };

            const user = await User.findByPk(objRecebido.usuario_id);

            if (user === null) {
                console.log('Usuário não encontrado');
                return;
            }

            await Comercio.create(objRecebido);
            console.log('Objeto Criado Indo Atualizar a permissao');

            user.setDataValue('roles', Role.Costumer);
            await user.save();
            console.log('permissao atualizada');

            return { mensagem: 'restaurante criado', objRecebido };
        } catch (error) {
            throw new Error(`Não foi possivel fazer o cadastro do Usuário: ${error}`);
        }
    }
}

export default new CommerceRepository();