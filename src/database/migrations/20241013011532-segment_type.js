/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('segments_types', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
                ),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('segments_types');
    },
};
