import { Task } from "../../../../src/task/domain/entities/task";
import { ManageTask } from "../../../../src/task/infrastructure/adapters/manageTask";


export const taskNotes = [
	{
		name : "comprar",
		content: "ir al super"
	},
	{
		name : "acabar sprint",
		content: "terminar sprint 4"
	},
	{
		name : "reunion",
		content: "meeting zoom"
	}
];

export const emptyTask = {
    status: 'pending'
}
export const updateTask = {
    status: 'completed'
}

export const saveTask =  async() =>{
	let manage : ManageTask =  new ManageTask();
	for (const note of taskNotes) {
		const task : Task = new Task(note.name, note.content)
		await manage.save(task.getNote());	
	} 
}
