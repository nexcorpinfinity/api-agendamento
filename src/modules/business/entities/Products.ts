import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../../../config/db/database';
import { Business } from './Business';

class Produto extends Model {}

Produto.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comercio_id: {
            type: DataTypes.UUID,
            references: {
                model: 'tb_comercio',
                key: 'id',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    },
    {
        tableName: 'tb_produtos',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

Business.hasMany(Produto, { foreignKey: 'comercio_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Produto.belongsTo(Business, { foreignKey: 'comercio_id' });

export { Produto };