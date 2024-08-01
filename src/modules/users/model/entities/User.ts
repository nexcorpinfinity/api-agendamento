import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../../../../config/database';
import { IUser, IUserEmpresarial } from '../interfaces/IUser';

class User extends Model<IUser> {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        permission: {
            type: DataTypes.STRING(128),
            defaultValue: 'user',
        },
    },
    {
        tableName: 'tb_users',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

class UserEmpresarial extends Model<IUserEmpresarial> {}

UserEmpresarial.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        permission: {
            type: DataTypes.STRING(128),
            defaultValue: 'user-empresa',
            allowNull: false,
        },
        cpfCnpj: {
            type: DataTypes.STRING(14),
            allowNull: true,
        },
    },
    {
        tableName: 'tb_users_empresarial',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

class UserAdmin extends Model<IUser> {}

UserAdmin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        permission: {
            type: DataTypes.STRING(128),
            defaultValue: 'user-admin',
            allowNull: false,
        },
    },
    {
        tableName: 'tb_users_admin',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

export { User, UserEmpresarial, UserAdmin };
