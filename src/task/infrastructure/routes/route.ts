import express, { Request, Response, NextFunction } from 'express';
import { landingpage } from '../../../views/layout/main';
import { controlInjection } from '../dependency/injectionControl';
import { authMiddelware } from '../../../backend/middlewares/auth';

const control = controlInjection();
const router = express.Router();

export const routes = () => {
    router.get('/',(req: Request, res:Response ) =>{res.send(landingpage)});
    router.get('/:id',    authMiddelware,  control.getTaskIdController);
    router.post('/',      control.postCreateTaskController);
    router.patch('/:id',  authMiddelware, control.patchTaskStatusController);
    router.delete('/:id', authMiddelware, control.deleteTaskController);
    return router;
}

export const routeSpecific = () => {
    router.get('/', authMiddelware, control.getAllTasksController);
    return router;
}

