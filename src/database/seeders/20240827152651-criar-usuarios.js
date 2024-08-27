/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert(
            'tb_users',
            [
                {
                    id: uuidv4(),
                    first_name: 'Edsu',
                    last_name: 'admin',
                    email: 'edsu@edsu.com',
                    password: await bcrypt.hash('123456', 10),
                    roles: 'admin',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    first_name: 'Comercio',
                    last_name: 'norte',
                    email: 'mercado@norte.com',
                    password: await bcrypt.hash('123456', 10),
                    roles: 'costumer',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {},
        );
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tb_users', {
            email: {
                [Sequelize.Op.in]: ['edsu@edsu.com', 'mercado@norte.com'],
            },
        });
    },
};
