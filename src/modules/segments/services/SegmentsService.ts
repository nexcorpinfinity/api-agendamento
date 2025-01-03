import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { SegmentsEntity } from '../entities/SegmentsEntity';
import { SegmentsTypesEntity } from '../entities/SegmentsTypesEntity';
import { ISegmentRepository } from '../intefaces/ISegmentRepository';
import { ISegmentsService } from '../intefaces/ISegmentsService';
import { ISegmentsTypesRepository } from '../intefaces/ISegmentsTypesRepository';

export class SegmentsService implements ISegmentsService {
    public constructor(
        private readonly segmentsRepository: ISegmentRepository,
        private readonly segmentsTypesRepository: ISegmentsTypesRepository,
    ) {}

    public async getAllSegments(): Promise<SegmentsEntity[] | Error> {
        try {
            const segments = await this.segmentsRepository.getAllSegments();

            return segments;
        } catch (error) {
            emitConsole(error);
            throw new Error('Error ao buscar segmentos');
        }
    }

    public async getOneSegment(idSegment: string): Promise<SegmentsEntity | Error> {
        try {
            const segment = await this.segmentsRepository.getSegmentById(idSegment);

            return segment;
        } catch (error) {
            emitConsole(error);
            throw new Error('Error ao buscar segmento');
        }
    }

    public async getAllSegmentsTypes(segment_id: string): Promise<Error | SegmentsTypesEntity[]> {
        try {
            const segmentsTypes = await this.segmentsTypesRepository.getSegmentTypes(segment_id);
            return segmentsTypes;
        } catch (error) {
            emitConsole(error);
            throw new Error('Error ao buscar tipos de segmentos');
        }
    }

    public async getOneSegmentType(idSegmentType: string): Promise<Error | SegmentsTypesEntity> {
        try {
            const segmentType =
                await this.segmentsTypesRepository.getSegmentTypeById(idSegmentType);
            return segmentType;
        } catch (error) {
            emitConsole(error);
            throw new Error('Error ao buscar tipo de segmento');
        }
    }
}
