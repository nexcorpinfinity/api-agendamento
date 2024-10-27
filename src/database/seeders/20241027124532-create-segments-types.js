/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            const servicoID = await queryInterface.sequelize.query(
                "SELECT id FROM segments WHERE name = 'Serviços' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            if (servicoID === null) {
                return new Error('Segmento Serviços não encontrado');
            }

            const bemEstarID = await queryInterface.sequelize.query(
                "SELECT id FROM segments WHERE name = 'Bem estar' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            if (bemEstarID === null) {
                return new Error('Segmento Serviços não encontrado');
            }

            const saudeID = await queryInterface.sequelize.query(
                "SELECT id FROM segments WHERE name = 'Saúde' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            if (saudeID === null) {
                return new Error('Segmento Serviços não encontrado');
            }

            const belezaID = await queryInterface.sequelize.query(
                "SELECT id FROM segments WHERE name = 'Beleza' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            if (belezaID === null) {
                return new Error('Segmento Serviços não encontrado');
            }

            const agendaInteligenteID = await queryInterface.sequelize.query(
                "SELECT id FROM segments WHERE name = 'Agenda inteligente' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            if (agendaInteligenteID === null) {
                return new Error('Segmento Serviços não encontrado');
            }

            await queryInterface.bulkInsert('segments_types', [
                {
                    id: uuidv4(),
                    name: 'Clínica de Estética',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Esmalteria e manicure',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Salão de beleza',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Barbearia',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Maquiagem',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Sobrancelhas e Cílios',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Depilação',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Cabeleireiro',
                    segment_id: belezaID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Acupuntura',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Massagem',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Yoga e Pilates',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'SPA',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Psicologia e Pedagogia',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Quiropraxia',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Personal e Fitness',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Terapias Holísticas',
                    segment_id: bemEstarID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Psiquiatra',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Endocrinologista',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Podologia',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Cardiologista',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Fisioterapia',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Neurologista',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Dermatologia',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Clínica Odontológica',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Pediatra',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Consultório Médico',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Clínica Oftalmológica',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Geriatra',
                    segment_id: saudeID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Pet Shop',
                    segment_id: servicoID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Oficina Mecânica',
                    segment_id: servicoID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Coloração Pessoal',
                    segment_id: servicoID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Serviços Automotivos',
                    segment_id: servicoID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Tatuagem e Piercing',
                    segment_id: servicoID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Consultoria de Estilo',
                    segment_id: servicoID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Clínica Veterinária',
                    segment_id: servicoID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Consultas',
                    segment_id: agendaInteligenteID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Mentorias',
                    segment_id: agendaInteligenteID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Locação de Quadras',
                    segment_id: agendaInteligenteID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Coworking',
                    segment_id: agendaInteligenteID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Professores',
                    segment_id: agendaInteligenteID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: uuidv4(),
                    name: 'Reuniões',
                    segment_id: agendaInteligenteID[0].id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);
        } catch (error) {
            // console.log(error);
        }
    },

    async down(queryInterface) {
        // Remover todos os registros da tabela segments_types
        await queryInterface.bulkDelete('segments_types', null, {});
    },
};
