import { Router } from 'express';

import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { authPermission } from '../../../middleware/AuthPermission';
import { Permissions } from '../../users/interfaces/EnumPermissions';
import { ProceduresController } from '../controller/ProceduresController';
import { ProceduresMiddleware } from '../middleware/ProceduresMiddleware';
import { ProcedureCatergoryRepository } from '../repository/ProcedureCatergoryRepository';
import { ProceduresRepository } from '../repository/ProceduresRepository';
import { ProceduresService } from '../service/ProceduresService';

const proceduresRouter = Router();

const proceduresRepository = new ProceduresRepository();
const procedureCategoryRepository = new ProcedureCatergoryRepository();

const proceduresService = new ProceduresService(proceduresRepository, procedureCategoryRepository);
const proceduresController = new ProceduresController(proceduresService);

const proceduresMiddlewares = new ProceduresMiddleware();

proceduresRouter.post(
    '/create',
    AuthLoginRequired,
    authPermission([Permissions.Costumer]),
    proceduresMiddlewares.createdProcedure,
    (req, res) => proceduresController.createOneProcedure(req, res),
);

proceduresRouter.post(
    '/create/category',
    AuthLoginRequired,
    authPermission([Permissions.Costumer]),
    proceduresMiddlewares.createdCategoryforProcedure,
    (req, res) => proceduresController.createCategoryForProcedure(req, res),
);

proceduresRouter.put(
    '/edit/:id',
    AuthLoginRequired,
    authPermission([Permissions.Costumer]),
    (req, res) => proceduresController.editOneProcedure(req, res),
);

proceduresRouter.delete(
    '/delete/:id',
    AuthLoginRequired,
    authPermission([Permissions.Costumer]),
    (req, res) => proceduresController.deleteOneProcedure(req, res),
);

proceduresRouter.get('/:business', (req, res) =>
    proceduresController.getallAndOneProcedures(req, res),
);

export { proceduresRouter };
