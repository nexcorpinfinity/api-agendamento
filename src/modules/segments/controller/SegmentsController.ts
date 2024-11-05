import { Request, Response } from 'express';

import { ResponseHandler } from '../../../config/ResponseHTTP/ResponseHTTP';
import { emitConsole } from '../../../utils/ConsoleDevelopment';
import { ISegmentController } from '../intefaces/ISegmentController';
import { ISegmentsService } from '../intefaces/ISegmentsService';

export class SegmentsController implements ISegmentController {
    public constructor(private readonly segmentsService: ISegmentsService) {}

    public async getAllSegments(
        req: Request,
        res: Response,
    ): Promise<Response<string[], Record<string, string>>> {
        try {
            const data = await this.segmentsService.getAllSegments();

            return ResponseHandler.success(
                res,
                200,
                data,
                'Todos segmentos retornado com sucesso!',
            );
        } catch (error) {
            emitConsole(error);
            return ResponseHandler.error(res, 500, 'Erro ao buscar segmentos');
        }
    }
    public async getSegmentById(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const segmentId = req.params.id;

            if (!segmentId) {
                return ResponseHandler.error(res, 400, 'Sem Id do Segmento');
            }

            const data = await this.segmentsService.getOneSegment(segmentId);

            return ResponseHandler.success(res, 200, data, 'Segmento retornado com sucesso!');
        } catch (error) {
            emitConsole(error);
            return ResponseHandler.error(res, 500, 'Erro ao buscar segmento');
        }
    }

    public async getAllSegmentTypes(
        req: Request,
        res: Response,
    ): Promise<Response<string[], Record<string, string>>> {
        try {
            const { segment_id } = req.query;

            const data = await this.segmentsService.getAllSegmentsTypes(String(segment_id));

            return ResponseHandler.success(
                res,
                200,
                data,
                'Todos tipos de segmento retornado com sucesso!',
            );
        } catch (error) {
            emitConsole(error);
            return ResponseHandler.error(res, 500, 'Erro ao buscar tipos de segmento');
        }
    }

    public async getSegmentTypeById(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>> {
        try {
            const segmentTypeId = req.params.id;

            if (!segmentTypeId) {
                return ResponseHandler.error(res, 400, 'Sem Id do Segmento type');
            }

            const data = await this.segmentsService.getOneSegmentType(segmentTypeId);

            return ResponseHandler.success(
                res,
                200,
                data,
                'Tipo de segmento retornado com sucesso!',
            );
        } catch (error) {
            emitConsole(error);
            return ResponseHandler.error(res, 500, 'Erro ao buscar tipo de segmento');
        }
    }
}
