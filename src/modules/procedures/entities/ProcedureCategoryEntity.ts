import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';
import { BusinessEntity } from '../../business/entities/BusinessEntity';

class ProcedureCategoryEntity extends Model {}

ProcedureCategoryEntity.init(
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
        tableName: 'procedures_categories',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

ProcedureCategoryEntity.belongsTo(BusinessEntity, {
    foreignKey: 'business_id',
    as: 'business',
});

export { ProcedureCategoryEntity };
