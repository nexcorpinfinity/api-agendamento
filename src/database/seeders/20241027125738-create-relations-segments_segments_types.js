/* eslint-disable no-inner-declarations */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// const { Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            const servicoID = await queryInterface.sequelize.query(
                `SELECT id FROM segments WHERE name = 'Serviços' LIMIT 1;`,
                { type: Sequelize.QueryTypes.SELECT },
            );

            const bemEstarID = await queryInterface.sequelize.query(
                `SELECT id FROM segments WHERE name = 'Bem estar' LIMIT 1;`,
                { type: Sequelize.QueryTypes.SELECT },
            );

            const saudeID = await queryInterface.sequelize.query(
                `SELECT id FROM segments WHERE name = 'Saúde' LIMIT 1;`,
                { type: Sequelize.QueryTypes.SELECT },
            );

            const belezaID = await queryInterface.sequelize.query(
                `SELECT id FROM segments WHERE name = 'Beleza' LIMIT 1;`,
                { type: Sequelize.QueryTypes.SELECT },
            );

            const agendaInteligenteID = await queryInterface.sequelize.query(
                `SELECT id FROM segments WHERE name = 'Agenda inteligente' LIMIT 1;`,
                { type: Sequelize.QueryTypes.SELECT },
            );

            const segmentsIDs = {
                Serviços: servicoID[0].id,
                'Bem estar': bemEstarID[0].id,
                Saúde: saudeID[0].id,
                Beleza: belezaID[0].id,
                'Agenda inteligente': agendaInteligenteID[0].id,
            };

            const associations = {
                Beleza: [
                    'Clínica de Estética',
                    'Esmalteria e manicure',
                    'Salão de beleza',
                    'Barbearia',
                    'Maquiagem',
                    'Sobrancelhas e Cílios',
                    'Depilação',
                    'Cabeleireiro',
                ],
                'Bem estar': [
                    'Acupuntura',
                    'Massagem',
                    'Yoga e Pilates',
                    'SPA',
                    'Psicologia e Pedagogia',
                    'Quiropraxia',
                    'Personal e Fitness',
                    'Terapias Holísticas',
                ],
                Saúde: [
                    'Psiquiatra',
                    'Endocrinologista',
                    'Podologia',
                    'Cardiologista',
                    'Fisioterapia',
                    'Neurologista',
                    'Dermatologia',
                    'Clínica Odontológica',
                    'Pediatra',
                    'Consultório Médico',
                    'Clínica Oftalmológica',
                    'Geriatra',
                ],
                Serviços: [
                    'Pet Shop',
                    'Oficina Mecânica',
                    'Coloração Pessoal',
                    'Serviços Automotivos',
                    'Tatuagem e Piercing',
                    'Consultoria de Estilo',
                    'Clínica Veterinária',
                ],
                'Agenda inteligente': [
                    'Consultas',
                    'Mentorias',
                    'Locação de Quadras',
                    'Coworking',
                    'Professores',
                    'Reuniões',
                ],
            };

            async function buscarAssociacoes(associations) {
                const ids = {};

                for (const [segmento, tipos] of Object.entries(associations)) {
                    ids[segmento] = await Promise.all(
                        tipos.map(async (tipo) => {
                            const result = await queryInterface.sequelize.query(
                                `SELECT id FROM segments_types WHERE name = :tipo LIMIT 1;`,
                                {
                                    type: Sequelize.QueryTypes.SELECT,
                                    replacements: { tipo },
                                },
                            );
                            return result.length > 0 ? result[0].id : null;
                        }),
                    );
                }

                return ids;
            }

            const associationIDs = await buscarAssociacoes(associations);

            async function inserirAssociacoes(segmentsIDs, associationIDs) {
                for (const segmento in associationIDs) {
                    for (const tipoID of associationIDs[segmento]) {
                        if (tipoID) {
                            await queryInterface.sequelize.query(
                                `INSERT INTO segments_segments_types (id,segment_id, segment_type_id) VALUES (:id, :segment_id, :segment_type_id);`,
                                {
                                    replacements: {
                                        id: uuidv4(),
                                        segment_id: segmentsIDs[segmento],
                                        segment_type_id: tipoID,
                                    },
                                },
                            );
                        }
                    }
                }
            }

            await inserirAssociacoes(segmentsIDs, associationIDs);
        } catch (error) {
            console.log(error);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('segments_segments_types', null, {});
    },
};
