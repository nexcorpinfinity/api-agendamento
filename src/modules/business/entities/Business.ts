import { Model, DataTypes } from 'sequelize';
import { sequelizeConnection } from '../../../config/db/database';
import { User } from '../../users/entities/User';

class Business extends Model {}

// verificar as validacões da criacao dessa tabela na migration
Business.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // cpnj: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
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
        tableName: 'business',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

User.hasOne(Business, { foreignKey: 'usuario_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Business.belongsTo(User, { foreignKey: 'usuario_id' });

export { Business };
