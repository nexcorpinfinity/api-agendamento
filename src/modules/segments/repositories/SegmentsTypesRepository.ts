import { SegmentsTypesEntity } from '../entities/SegmentsTypesEntity';
import { ISegmentsTypesRepository } from '../intefaces/ISegmentsTypesRepository';

export class SegmentsTypesRepository implements ISegmentsTypesRepository {
    public constructor(private readonly segmentsTypeEntity = SegmentsTypesEntity) {}

    public async createSegmentType(
        nameSegment: string,
        segment_id: string,
    ): Promise<SegmentsTypesEntity | Error> {
        try {
            const segmentType = await this.segmentsTypeEntity.create({
                name: nameSegment,
                segment_id: segment_id,
            });
            return segmentType;
        } catch (error) {
            console.log(error);
            throw new Error('Error criar segment type');
        }
    }

    public async verifySegmentTypeExists(segmentTypeId: string): Promise<boolean> {
        try {
            const segmentType = await this.segmentsTypeEntity.findByPk(segmentTypeId);
            return !!segmentType;
        } catch (error) {
            console.log(error);
            throw new Error('Error ao verificar segment type');
        }
    }
}
