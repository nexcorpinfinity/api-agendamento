import { BusinessSegmentsTypesEntity } from '../entities/BusinessSegmentsTypes';

export interface IBusinessSegmentsTypesRepository {
    createBusinessSegmentsTypes(
        businessId: string,
        segmentTypeId: string,
    ): Promise<BusinessSegmentsTypesEntity | Error>;
}
