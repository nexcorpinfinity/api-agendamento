/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('segments_types', [
            {
                id: uuidv4(),
                name: 'Clínica de Estética',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Esmalteria e manicure',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Salão de beleza',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Barbearia',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Maquiagem',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Sobrancelhas e Cílios',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Depilação',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Cabeleireiro',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Acupuntura',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Massagem',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Yoga e Pilates',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'SPA',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Psicologia e Pedagogia',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Quiropraxia',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Personal e Fitness',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Terapias Holísticas',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Psiquiatra',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Endocrinologista',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Podologia',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Cardiologista',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Fisioterapia',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Neurologista',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Dermatologia',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Clínica Odontológica',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Pediatra',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Consultório Médico',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Clínica Oftalmológica',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Geriatra',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Pet Shop',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Oficina Mecânica',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Coloração Pessoal',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Serviços Automotivos',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Tatuagem e Piercing',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Consultoria de Estilo',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Clínica Veterinária',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Consultas',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Mentorias',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Locação de Quadras',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Coworking',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Professores',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Reuniões',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        // Remover todos os registros da tabela segments_types
        await queryInterface.bulkDelete('segments_types', null, {});
    },
};
