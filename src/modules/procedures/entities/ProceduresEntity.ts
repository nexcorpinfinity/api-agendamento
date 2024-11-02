import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';
import { BusinessEntity } from '../../business/entities/BusinessEntity';

import { ProcedureCategoryEntity } from './ProcedureCategoryEntity';

class ProceduresEntity extends Model {}

ProceduresEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        procedures_categories_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: ProcedureCategoryEntity,
                key: 'id',
            },
        },
        business_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: BusinessEntity,
                key: 'id',
            },
        },
    },
    {
        tableName: 'procedures',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

ProceduresEntity.belongsTo(ProcedureCategoryEntity, {
    foreignKey: 'procedures_categories_id',
    as: 'category',
});

export { ProceduresEntity };
