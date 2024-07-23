import { TaskServiceInteractor } from "../../application/services/taskService";
import express, { Request, Response, NextFunction } from 'express';
import { Note } from "../../domain/entities/note";
import { HttpResponse } from "../../../shared/response/httpResponse";


export class TaskController{
    constructor(
        private taskservice: TaskServiceInteractor,
        private httpResponse : HttpResponse
     ){}

    //inserts
    postCreateTaskController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {name, content}  = req.body as { name: string, content: string};
            if(!name || !content){
                return this.httpResponse.statusBadRequest(res, {detail: 'All fields are required'});
            }
            const data : Note = await this.taskservice.createNewTask(name, content)
            if(!data){
                return this.httpResponse.statusBadRequest(res, {detail: 'The new task could not be created'});
            }
            return this.httpResponse.statusCreated(res, data ); 
        } catch (error) {
            console.log(error);
        }
    } 

    //getters
    getTaskIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParam: string = req.params.id;
            const data: Note = await this.taskservice.taskById(idParam);
            return this.httpResponse.statusOk(res, data );
        } catch (error) {
            console.log(error);
            return this.httpResponse.statusNotFound(res, {detail: 'Not found: Task not found in BBDD'});
        }
    }

    getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas : [string, Note][] | undefined = await this.taskservice.getAllTasks();
            return this.httpResponse.statusOk(res, datas);
        } catch (error) {
            console.log(error);
            return this.httpResponse.statusNotFound(res, {detail: 'Not found: not found any tasks in BBDD'});
        }
    }
    
    //updates
    patchTaskStatusController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParam: string = (req.params.id);
            const {status} = req.body as { status: string};
            if(!status){
                return this.httpResponse.statusBadRequest(res, {detail: 'Bad Request: The field is required'});
            }

            const dataMod : Note | undefined = await this.taskservice.updateStatusTask( status.toString(), idParam);
            return this.httpResponse.statusOk(res, dataMod );
        } catch (error) {
            console.log(error);
            return this.httpResponse.statusNotFound(res, {detail: 'Not found: Task not found in BBDD'});
        }
    }
    
    //delete
    deleteTaskController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParam: string = (req.params.id);
            const data : Note | undefined = await this.taskservice.deleteTaskById(idParam);
            return this.httpResponse.statusOk(res, {name: data!.name, success: "delete successful"} );
        } catch (error) {
            console.log(error);
            return this.httpResponse.statusNotFound(res, {detail: 'Not found: Task not found in BBDD'});
        }
    }
 
}