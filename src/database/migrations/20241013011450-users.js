/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            photo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            number_phone: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            permission: {
                type: Sequelize.ENUM('admin', 'costumer', 'client'),
                allowNull: false,
            },
            // planos_id: {
            //     type: Sequelize.INTEGER,
            //     allowNull: false,
            //     references: {
            //         model: 'tb_planos',
            //         key: 'id',
            //     },
            //     onUpdate: 'CASCADE',
            //     onDelete: 'SET NULL',
            // },
            api_key: {
                type: Sequelize.STRING(64),
                allowNull: true,
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
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    },
};
