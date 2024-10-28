import { SegmentsEntity } from '../entities/SegmentsEntity';

export class SegmentsRepository {
    public constructor(private readonly segmentsEntity = SegmentsEntity) {}

    public async createSegment(nameSegment: string): Promise<SegmentsEntity | Error> {
        try {
            const segment = await this.segmentsEntity.create({
                name: nameSegment,
            });
            return segment;
        } catch (error) {
            console.log(error);
            throw new Error('Error criar segment');
        }
    }
    public async getAllSegments(): Promise<SegmentsEntity[] | Error> {
        try {
            const segments = await this.segmentsEntity.findAll();
            return segments;
        } catch (error) {
            console.log(error);
            throw new Error('Error buscar segmentos');
        }
    }

    public async getSegmentById(segmentId: string): Promise<SegmentsEntity | Error> {
        try {
            const segment = await this.segmentsEntity.findByPk(segmentId);

            if (!segment) {
                throw new Error('Segmento não encontrado');
            }

            return segment.dataValues;
        } catch (error) {
            console.log(error);
            throw new Error('Error buscar segmento');
        }
    }
}
