/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.bulkInsert('users', [
                {
                    id: uuidv4(),
                    name: 'edsu',
                    email: 'edson@admin.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511987654321',
                    permission: 'admin',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Jhony',
                    email: 'jhony@admin.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511987654321',
                    permission: 'admin',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'João',
                    email: 'joao@admin.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511987654321',
                    permission: 'admin',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Lorena',
                    email: 'lorena@costumer.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511912345678',
                    permission: 'costumer',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Douglas',
                    email: 'douglas@costumer.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511912345678',
                    permission: 'costumer',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Amanda',
                    email: 'amanda@costumer.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511912345678',
                    permission: 'costumer',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Thais',
                    email: 'thais@client.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511912345678',
                    permission: 'client',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Roberto',
                    email: 'roberto@client.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511912345678',
                    permission: 'client',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Nayara',
                    email: 'nayara@client.com',
                    password: await bcrypt.hash('12345678', 12),
                    photo: null,
                    number_phone: '+5511912345678',
                    permission: 'client',
                    api_key: uuidv4(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', {
            email: {
                [Sequelize.Op.in]: [
                    'edson@admin.com',
                    'jhony@admin.com',
                    'joao@admin.com',
                    'lorena@costumer.com',
                    'douglas@costumer.com',
                    'amanda@costumer.com',
                    'thais@client.com',
                    'roberto@client.com',
                    'nayara@client.com',
                ],
            },
        });
    },
};
