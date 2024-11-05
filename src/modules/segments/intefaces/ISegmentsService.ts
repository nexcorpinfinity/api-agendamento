import { SegmentsEntity } from '../entities/SegmentsEntity';
import { SegmentsTypesEntity } from '../entities/SegmentsTypesEntity';

export interface ISegmentsService {
    getAllSegments(): Promise<SegmentsEntity[] | Error>;
    getOneSegment(idSegment: string): Promise<SegmentsEntity | Error>;
    getAllSegmentsTypes(segment_id: string): Promise<Error | SegmentsTypesEntity[]>;
    getOneSegmentType(idSegmentType: string): Promise<Error | SegmentsTypesEntity>;
}
