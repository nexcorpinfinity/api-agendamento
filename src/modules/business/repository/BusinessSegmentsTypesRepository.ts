import { BusinessSegmentsTypesEntity } from '../entities/BusinessSegmentsTypes';
import { IBusinessSegmentsTypesRepository } from '../interface/IBusinessSegmentsTypesRepository';

export class BusinessSegmentsTypesRepository implements IBusinessSegmentsTypesRepository {
    public constructor(
        private readonly businessSegmentsTypesEntity = BusinessSegmentsTypesEntity,
    ) {}

    public async createBusinessSegmentsTypes(
        businessId: string,
        segmentTypeId: string,
    ): Promise<BusinessSegmentsTypesEntity | Error> {
        try {
            const dataBusinessAndSegment = await this.businessSegmentsTypesEntity.create({
                fk_business_id: businessId,
                fk_segment_type_id: segmentTypeId,
            });

            return dataBusinessAndSegment;
        } catch (error) {
            console.error(error);
            throw new Error('Error ao criar relacionamento business segment');
        }
    }
}
