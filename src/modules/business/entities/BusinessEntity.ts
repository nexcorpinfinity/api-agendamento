import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';
import { ProceduresEntity } from '../../procedures/entities/ProceduresEntity';
import { UserEntity } from '../../users/entities/UserEntity';

class BusinessEntity extends Model {}

BusinessEntity.init(
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
        documents: {
            type: DataTypes.STRING(18),
            allowNull: true,
            unique: true,
            validate: {
                is: /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/,
            },
        },
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
        zip: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^\d{5}-\d{3}$/,
            },
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: UserEntity,
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

UserEntity.hasOne(BusinessEntity, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
BusinessEntity.belongsTo(UserEntity, { foreignKey: 'user_id' });

BusinessEntity.hasMany(ProceduresEntity, {
    foreignKey: 'business_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ProceduresEntity.belongsTo(BusinessEntity, {
    foreignKey: 'business_id',
});

export { BusinessEntity };
