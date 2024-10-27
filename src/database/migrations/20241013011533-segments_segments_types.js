/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('segments_segments_types', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            segment_id: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: false,
                references: {
                    model: 'segments',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            segment_type_id: {
                type: Sequelize.UUID,
                allowNull: false,
                unique: true,
                references: {
                    model: 'segments_types',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('segments_segments_types');
    },
};
