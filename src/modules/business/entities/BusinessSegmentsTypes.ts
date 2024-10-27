import { Model, DataTypes } from 'sequelize';

import { sequelizeConnection } from '../../../config/db/database';
import { SegmentsTypesEntity } from '../../segments/entities/SegmentsTypesEntity';

import { BusinessEntity } from './BusinessEntity';

class BusinessSegmentsTypesEntity extends Model {}

BusinessSegmentsTypesEntity.init(
    {
        fk_business_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: BusinessEntity,
                key: 'id',
            },
        },
        fk_segment_type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: SegmentsTypesEntity,
                key: 'id',
            },
        },
    },
    {
        tableName: 'business_segments_types',
        sequelize: sequelizeConnection,
        underscored: true,
    },
);

BusinessEntity.hasOne(BusinessSegmentsTypesEntity, {
    foreignKey: 'fk_business_id',
    as: 'segmentType',
});

SegmentsTypesEntity.hasOne(BusinessSegmentsTypesEntity, {
    foreignKey: 'fk_segment_type_id',
    as: 'business',
});

BusinessSegmentsTypesEntity.belongsTo(BusinessEntity, {
    foreignKey: 'fk_business_id',
    as: 'business',
});

BusinessSegmentsTypesEntity.belongsTo(SegmentsTypesEntity, {
    foreignKey: 'fk_segment_type_id',
    as: 'segmentType',
});

export { BusinessSegmentsTypesEntity };
