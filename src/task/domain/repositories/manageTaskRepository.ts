const Note = require('../entities/note');

interface TaskRepositoryMethod {
    save(task:typeof Note): Promise<void |undefined>,
    foundTaskUpdateStatus(id: string, state: string) : Promise< typeof Note | undefined>,
    findTaskAndDeleteTaskById(id: string): Promise< typeof Note | undefined>,
    getTaskById(id: string): Promise < typeof Note>,
    getCloneAllTasks():Promise<[string, typeof Note][] | undefined>
}

export type TaskRepository = TaskRepositoryMethod;
