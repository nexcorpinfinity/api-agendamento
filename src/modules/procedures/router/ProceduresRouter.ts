import { Router } from 'express';

import AuthLoginRequired from '../../../middleware/AuthLoginRequired';
import { authPermission } from '../../../middleware/AuthPermission';
import { Permissions } from '../../users/interfaces/EnumPermissions';
import { ProceduresController } from '../controller/ProceduresController';
import { ProceduresRepository } from '../repository/ProceduresRepository';
import { ProceduresService } from '../service/ProceduresService';

const proceduresRouter = Router();

const proceduresRepository = new ProceduresRepository();
const proceduresService = new ProceduresService(proceduresRepository);
const proceduresController = new ProceduresController(proceduresService);

proceduresRouter.get('/', (req, res) => proceduresController.getallAndOneProcedures(req, res));

proceduresRouter.post(
    '/create',
    AuthLoginRequired,
    authPermission([Permissions.Costumer]),
    (req, res) => proceduresController.createOneProcedure(req, res),
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

export { proceduresRouter };
