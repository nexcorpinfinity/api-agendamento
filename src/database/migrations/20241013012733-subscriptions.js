/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('subscriptions', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            plan_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'plans',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            activation_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            expiration_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'),
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('ATIVO', 'CANCELADO', 'EXPIRADO'),
                allowNull: false,
            },
            cancellation_date: {
                type: Sequelize.DATE,
                allowNull: true,
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
        await queryInterface.dropTable('subscriptions');
    },
};
