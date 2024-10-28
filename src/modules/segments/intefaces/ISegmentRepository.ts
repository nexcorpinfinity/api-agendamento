import { SegmentsEntity } from '../entities/SegmentsEntity';

export interface ISegmentRepository {
    getAllSegments(): Promise<SegmentsEntity[] | Error>;
    getSegmentById(segmentId: string): Promise<SegmentsEntity | Error>;
}
