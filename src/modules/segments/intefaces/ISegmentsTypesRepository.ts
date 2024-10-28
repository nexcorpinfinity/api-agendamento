import { SegmentsTypesEntity } from '../entities/SegmentsTypesEntity';

export interface ISegmentsTypesRepository {
    createSegmentType(
        nameSegment: string,
        segment_id: string,
    ): Promise<SegmentsTypesEntity | Error>;
    verifySegmentTypeExists(segmentTypeId: string): Promise<boolean>;
    getSegmentTypeById(segmentTypeId: string): Promise<SegmentsTypesEntity | Error>;
    getSegmentTypes(): Promise<SegmentsTypesEntity[] | Error>;
}
