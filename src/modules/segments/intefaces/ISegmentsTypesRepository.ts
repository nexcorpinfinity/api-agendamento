import { SegmentsTypesEntity } from '../entities/SegmentsTypesEntity';

export interface ISegmentsTypesRepository {
    createSegmentType(
        nameSegment: string,
        segment_id: string,
    ): Promise<SegmentsTypesEntity | Error>;
    verifySegmentTypeExists(segmentTypeId: string): Promise<boolean>;
}
