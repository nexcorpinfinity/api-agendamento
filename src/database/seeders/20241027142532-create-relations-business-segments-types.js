/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            const lorenaBusinessId = await queryInterface.sequelize.query(
                "SELECT id FROM business WHERE name = 'Lorena Designer' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            const lorenasegments_typeId = await queryInterface.sequelize.query(
                "SELECT id FROM segments_types WHERE name = 'Sobrancelhas e Cílios' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            const douglasBusinessId = await queryInterface.sequelize.query(
                "SELECT id FROM business WHERE name = 'Barbearia Douglas' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            const douglassegments_typeId = await queryInterface.sequelize.query(
                "SELECT id FROM segments_types WHERE name = 'Barbearia' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            const amandaBusinessId = await queryInterface.sequelize.query(
                "SELECT id FROM business WHERE name = 'Manicure Amanda' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            const amandasegments_typeId = await queryInterface.sequelize.query(
                "SELECT id FROM segments_types WHERE name = 'Esmalteria e manicure' LIMIT 1;",
                { type: Sequelize.QueryTypes.SELECT },
            );

            await queryInterface.bulkInsert('business_segments_types', [
                {
                    fk_business_id: lorenaBusinessId[0].id,
                    fk_segments_types_id: lorenasegments_typeId[0].id,
                },
                {
                    fk_business_id: douglasBusinessId[0].id,
                    fk_segments_types_id: douglassegments_typeId[0].id,
                },
                {
                    fk_business_id: amandaBusinessId[0].id,
                    fk_segments_types_id: amandasegments_typeId[0].id,
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('business_segments_types', null, {});
    },
};
