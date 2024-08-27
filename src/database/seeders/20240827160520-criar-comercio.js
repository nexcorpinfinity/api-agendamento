/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        const user = await queryInterface.sequelize.query(`SELECT id FROM "tb_users" WHERE email IN ('mercado@norte.com');`, { type: Sequelize.QueryTypes.SELECT });

        return queryInterface.bulkInsert(
            'tb_comercio',
            [
                {
                    id: uuidv4(),
                    comercio_name: 'Mercadinho',
                    cpf_cpnj: '123.123.123-00',
                    endereco: 'av teste',
                    usuario_id: user[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tb_comercio', {
            comercio_name: {
                [Sequelize.Op.in]: ['Mercadinho'],
            },
        });
    },
};
