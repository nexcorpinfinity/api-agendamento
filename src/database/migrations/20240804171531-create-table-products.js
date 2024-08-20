module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tb_produtos', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            product_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            quantidade: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            comercio_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'tb_comercio',
                    key: 'id',
                },
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
        await queryInterface.dropTable('tb_produtos');
    },
};
