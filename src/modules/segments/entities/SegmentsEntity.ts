import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';

class SegmentsEntity extends Model {}

SegmentsEntity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'segments',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

export { SegmentsEntity };
