import { BusinessSegmentsTypesEntity } from '../entities/BusinessSegmentsTypes';

export interface IBusinessSegmentsTypesRepository {
    createBondBusinessSegmentsTypes(
        businessId: string,
        segmentTypeId: string,
    ): Promise<BusinessSegmentsTypesEntity | Error>;
}
