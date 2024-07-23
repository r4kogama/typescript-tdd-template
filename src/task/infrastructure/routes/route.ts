import express, { Request, Response, NextFunction } from 'express';
import { landingpage } from '../../../views/layout/main';
import { controlInjection } from '../dependency/injectionControl';


const control = controlInjection();
const router = express.Router();

export const routes = () => {
    router.get('/',(req: Request, res:Response ) =>{res.send(landingpage)});
    router.get('/:id',   control.getTaskIdController);
    router.post('/',     control.postCreateTaskController);
    router.patch('/:id', control.patchTaskStatusController);
    router.delete('/:id',control.deleteTaskController);
    return router;
}

export const routeSpecific = () => {
    router.get('/',control.getAllTasksController);
    return router;
}

