const Note = require('../../domain/entities/note');
const Task = require('../../domain/entities/task');
const TaskRepository = require('../../domain/repositories/manageTaskRepository')

 export  class TaskServiceInteractor {
    constructor( private taskRepository : typeof TaskRepository){}

    async  createNewTask(name: string, content:string): Promise< typeof Note>{
      try {
        const task = new Task(name, content);
        const getTask: typeof Note = task.getNote();
        await this.taskRepository.save(getTask);
        return getTask;
      } catch (error) {
        throw error;
      }
    }
    
    async taskById(idTask: string):Promise<typeof Note>{
      try {
        const task: typeof Note = await this.taskRepository.getTaskById(idTask);
        return task;
      } catch (error) {
        throw error;
      }
    }

    async getAllTasks(): Promise<[string, typeof Note][] | undefined> {
      try {
        const task: [string, typeof Note][] | undefined  = await this.taskRepository.getCloneAllTasks();
        return task;
      } catch (error) {
        throw error;
      }
    }
    
    async updateStatusTask(status: string, idTask: string): Promise< typeof Note | undefined>{
      try {
        const taskUpdated : typeof Note | undefined = await this.taskRepository.foundTaskUpdateStatus(status, idTask)
        return taskUpdated;
      } catch (error) {
        throw error;
      }
    }

    async deleteTaskById(idTask: string): Promise<typeof Note | undefined>{
      try {
        const copyTaskDeleted: typeof Note | undefined = await this.taskRepository.findTaskAndDeleteTaskById(idTask);
        return copyTaskDeleted;
      } catch (error) {
        throw error;
      }
    }

 }

 module.exports = TaskServiceInteractor;