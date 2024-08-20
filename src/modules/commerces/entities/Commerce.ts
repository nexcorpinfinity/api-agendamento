import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../../../config/database';
import { User } from '../../users/entities/User';

class Comercio extends Model {}

Comercio.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        comercio_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf_cpnj: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'tb_users',
                key: 'id',
            },
            unique: true,
        },
    },
    {
        tableName: 'tb_comercio',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

User.hasOne(Comercio, { foreignKey: 'usuario_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Comercio.belongsTo(User, { foreignKey: 'usuario_id' });

export { Comercio };
