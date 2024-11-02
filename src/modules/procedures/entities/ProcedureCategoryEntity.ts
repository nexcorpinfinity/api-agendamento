import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';

import { ProceduresEntity } from './ProceduresEntity';

class ProcedureCategoryEntity extends Model {}

ProcedureCategoryEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: 'procedures',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

ProcedureCategoryEntity.hasMany(ProceduresEntity, {
    foreignKey: 'procedures_categories_id',
    as: 'procedures',
});

export { ProcedureCategoryEntity };
