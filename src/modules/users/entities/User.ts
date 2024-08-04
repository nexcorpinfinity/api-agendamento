import { Model, DataTypes } from 'sequelize';

import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import sequelizeConnection from '../../../config/database';

class User extends Model<IUser> {
    static isValidPassword: (password: string, hash: string) => boolean;
    static hashPassword: (password: string) => string;
}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        last_name: {
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
            set(value: string) {
                const hash = bcrypt.hashSync(value, 16);
                this.setDataValue('password', hash);
            },
        },
        roles: {
            type: DataTypes.STRING(10),
            defaultValue: 'user',
            allowNull: false,
        },
    },
    {
        tableName: 'tb_users',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

User.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(18));
};

User.isValidPassword = function (password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
};

export { User };
