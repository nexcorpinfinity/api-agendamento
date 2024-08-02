module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tb_users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            roles: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: 'user',
            },
            // restaurante_id: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: 'tb_restaurants',
            //         key: 'id',
            //     },
            //     allowNull: true,
            //     onUpdate: 'CASCADE',
            //     onDelete: 'SET NULL',
            // },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('tb_users');
    },
};
