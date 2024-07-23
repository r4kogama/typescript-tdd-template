import { Task } from "../../domain/entities/task";
import { Note } from "../../domain/entities/note";
import {TaskRepository} from "../../domain/repositories/manageTaskRepository"

export class TaskServiceInteractor {
    constructor( private taskRepository : TaskRepository){}

    async  createNewTask(name: string, content:string): Promise<Note>{
      try {
        const task = new Task(name, content);
        const getTask: Note = task.getNote();
        await this.taskRepository.save(getTask);
        return getTask;
      } catch (error) {
        throw error;
      }
    }
    
    async taskById(idTask: string):Promise<Note>{
      try {
        const task: Note = await this.taskRepository.getTaskById(idTask);
        return task;
      } catch (error) {
        throw error;
      }
    }

    async getAllTasks(): Promise<[string, Note][] | undefined> {
      try {
        const task: [string, Note][] | undefined  = await this.taskRepository.getCloneAllTasks();
        return task;
      } catch (error) {
        throw error;
      }
    }
    
    async updateStatusTask(status: string, idTask: string): Promise<Note | undefined>{
      try {
        const taskUpdated : Note | undefined = await this.taskRepository.foundTaskUpdateStatus(status, idTask)
        return taskUpdated;
      } catch (error) {
        throw error;
      }
    }

    async deleteTaskById(idTask: string): Promise<Note | undefined>{
      try {
        const copyTaskDeleted: Note | undefined = await this.taskRepository.findTaskAndDeleteTaskById(idTask);
        return copyTaskDeleted;
      } catch (error) {
        throw error;
      }
    }

 }