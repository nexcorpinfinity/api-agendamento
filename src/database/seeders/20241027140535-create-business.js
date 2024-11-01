/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            const lorenaId = await queryInterface.sequelize.query(
                "SELECT id FROM users WHERE email = 'lorena@costumer.com' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            const douglasId = await queryInterface.sequelize.query(
                "SELECT id FROM users WHERE email =  'douglas@costumer.com' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            const amandaId = await queryInterface.sequelize.query(
                "SELECT id FROM users WHERE email = 'amanda@costumer.com' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            await queryInterface.bulkInsert('business', [
                {
                    id: uuidv4(),
                    name: 'Lorena Designer',
                    documents: null,
                    address: null,
                    city: null,
                    state: null,
                    zip: null,
                    photo: null,
                    user_id: lorenaId[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Barbearia Douglas',
                    documents: null,
                    address: null,
                    city: null,
                    state: null,
                    zip: null,
                    photo: null,
                    user_id: douglasId[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Manicure Amanda',
                    documents: null,
                    address: null,
                    city: null,
                    state: null,
                    zip: null,
                    photo: null,
                    user_id: amandaId[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('business', {
            name: {
                [Sequelize.Op.in]: ['Lorena Designer', 'Barbearia Douglas', 'Manicure Amanda'],
            },
        });
    },
};
