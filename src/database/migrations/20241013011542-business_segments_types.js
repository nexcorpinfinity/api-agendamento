/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('business_segments_types', {
            fk_business_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'business',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            fk_segments_types_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'segments_types',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });

        await queryInterface.addConstraint('business_segments_types', {
            fields: ['fk_business_id', 'fk_segments_types_id'],
            type: 'primary key',
            name: 'pk_business_segments_types',
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('business_segments_types');
    },
};
