import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';

import { SegmentsEntity } from './SegmentsEntity';

class SegmentsTypesEntity extends Model {}

SegmentsTypesEntity.init(
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
        segment_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: SegmentsEntity,
                key: 'id',
            },
            unique: false,
        },
    },
    {
        tableName: 'segments_types',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

SegmentsTypesEntity.belongsTo(SegmentsEntity, {
    foreignKey: 'segment_id',
    as: 'segment',
});

export { SegmentsTypesEntity };
