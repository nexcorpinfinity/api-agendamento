/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('segments', [
            {
                id: uuidv4(),
                name: 'Beleza',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Bem estar',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Saúde',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Serviços',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Agenda inteligente',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('segments', null, {});
    },
};
