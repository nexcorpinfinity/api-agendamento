import { Router } from 'express';

import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { authenticateToken } from '../../../middleware/AuthPermission';
import { Permissions } from '../../users/interfaces/EnumPermissions';
import { SegmentsController } from '../controller/SegmentsController';
import { SegmentsRepository } from '../repositories/SegmentsRepository';
import { SegmentsTypesRepository } from '../repositories/SegmentsTypesRepository';
import { SegmentsService } from '../services/SegmentsService';

const segmentsRoute = Router();

const segmentsTypesRepository = new SegmentsTypesRepository();

const segmentsRepository = new SegmentsRepository();

const segmentsService = new SegmentsService(segmentsRepository, segmentsTypesRepository);

const segmentsController = new SegmentsController(segmentsService);

segmentsRoute.get('/', AuthLoginRequired, authenticateToken([Permissions.Costumer]), (req, res) =>
    segmentsController.getAllSegments(req, res),
);
segmentsRoute.get('/id/:id', (req, res) => segmentsController.getSegmentById(req, res));
segmentsRoute.get('/types', (req, res) => segmentsController.getAllSegmentTypes(req, res));
segmentsRoute.get('/types/id/:id', (req, res) => segmentsController.getSegmentTypeById(req, res));

export { segmentsRoute };
