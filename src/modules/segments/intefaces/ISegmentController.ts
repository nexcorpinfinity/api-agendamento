import { Request, Response } from 'express';

export interface ISegmentController {
    getAllSegments(
        req: Request,
        res: Response,
    ): Promise<Response<string[], Record<string, string>>>;
    getSegmentById(req: Request, res: Response): Promise<Response<string, Record<string, string>>>;

    getAllSegmentTypes(
        req: Request,
        res: Response,
    ): Promise<Response<string[], Record<string, string>>>;

    getSegmentTypeById(
        req: Request,
        res: Response,
    ): Promise<Response<string, Record<string, string>>>;
}
