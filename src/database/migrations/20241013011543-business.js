/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('business', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            documents: {
                type: Sequelize.STRING(18),
                allowNull: true,
                unique: true,
                validate: {
                    is: /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/,
                },
            },
            address: {
                type: Sequelize.STRING(60),
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING(2),
                allowNull: true,
            },
            cep: {
                type: Sequelize.STRING(9),
                allowNull: true,
                validate: {
                    is: /^\d{5}-\d{3}$/,
                },
            },
            photo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            user_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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
        await queryInterface.dropTable('business');
    },
};
