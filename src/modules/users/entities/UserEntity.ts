import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';
import { IUser } from '../interfaces/IUser';

class UserEntity extends Model<IUser> {}

UserEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        number_phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        permission: {
            type: DataTypes.ENUM('admin', 'costumer', 'client'),
            allowNull: false,
        },
        api_key: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

export { UserEntity };
