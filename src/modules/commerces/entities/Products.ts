import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../../../config/database';
import { Comercio } from './Commerce';

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
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.STRING,
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

Comercio.hasMany(Produto, { foreignKey: 'comercio_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Produto.belongsTo(Comercio, { foreignKey: 'comercio_id' });

export { Produto };
