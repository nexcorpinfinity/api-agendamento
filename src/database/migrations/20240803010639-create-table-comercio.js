module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tb_comercio', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            comercio_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cpf_cpnj: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            endereco: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            usuario_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'tb_users',
                    key: 'id',
                },
                unique: true,
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
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
        await queryInterface.dropTable('tb_comercio');
    },
};
