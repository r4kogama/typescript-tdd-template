import { TaskRepository } from "../../domain/repositories/manageTaskRepository";
import { Note } from "../../domain/entities/note";
import { isObject } from "../guards/repositoryGuards";

export class ManageTask implements TaskRepository{
    private tasks : Map<string, Note> = new Map();
    constructor(){   }
    
    getTasks(): Map<string, Note>{
		return this.tasks;
	}

    async isTaskById(id: string): Promise<Boolean> {
        return await new Promise<Boolean>((resolve)=>{
            if(this.tasks.has(id)){
                resolve(true);
            }else{
                resolve(false);
            }
        })
    }

    async save(task: Note):Promise<void> {
        return await new Promise<void>((resolve, reject) => {
            try {
                if(this.tasks.size === 0){
                    this.tasks.set("1", task);
                    resolve();
                }else{
                    let keys: string[] =  [...this.tasks.keys()];
                    let idTask: number = Math.max(...keys.map(Number));
                    this.tasks.set((idTask + 1).toString(), task);
                    //console.log(this.tasks); 
                    resolve();
                }
            } catch (error) {
                reject( new Error(`Error request save new task: ${error}`));
            }
        })
    } 


    async getTaskById(idTask: string): Promise<Note > {
        return await new Promise<Note>(async (resolve, reject)=>{
            try {
                const exist = await this.isTaskById(idTask);
                if(!exist){
                    reject({ status: 404, message: 'Promise request get task not found in the manage' });
                    return;
                }
                resolve(this.tasks.get(idTask)!);
            } catch (error) {
                reject(new Error(`Error promise: ${error}`));
            }
        })
    }

    async foundTaskUpdateStatus(state: string, id: string): Promise<Note | undefined> {
        return await new Promise<Note | undefined>(async (resolve, reject) => {
            try {
                const exist = await this.isTaskById(id);
                if(!exist){
                    reject({ status: 404, message: 'Promise request update status not found task in the manage' });
                    return;
                    }
                const getNote: Note | undefined = this.tasks.get(id);
                if (isObject(getNote)) {
                    getNote.status = getNote.asignStatusNote(state);
                    resolve(getNote);
                }else{
                reject();
                } 
            } catch (error) {
                reject(new Error(`Error request update status task: ${error}`));
            }
        })
    }
    async findTaskAndDeleteTaskById(idTask: string): Promise<Note | undefined> {
        return await new Promise<Note | undefined> (async (resolve, reject) => {
            try {
                const exist = await this.isTaskById(idTask);
                if(!exist){
                    reject({ status: 404, message: 'Promise request delete not found task in the manage' });
                    return;
                    }
                const getCloneTask: Note | undefined = structuredClone(this.tasks.get(idTask));
                this.tasks.delete(idTask);
                resolve(getCloneTask);
            } catch (error) {
                reject(new Error(`Error request  delete task by id: ${error}`));
            }
        })
    }
    async getCloneAllTasks(): Promise<[string, Note][] | undefined> {
        return await new Promise<[string, Note][] | undefined> ((resolve, reject) => {
            try {
                if(this.tasks.size === 0){
                    reject({ status: 404, message: 'Promise request get all not found task in the manage' });
                    return;
                }
                const cloneTasks: Map<string, Note> = structuredClone(this.tasks);
                const sortDatas = Array.from(cloneTasks).sort((a :[string, Note], b :[string, Note]) => a[1].name.localeCompare(b[1].name));
                resolve(sortDatas);
            } catch (error) {
                reject(new Error(`Error request get all tasks: ${error}`));
            }
        })
    }
}