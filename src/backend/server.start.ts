import { App } from "./App";
import { controlInjection } from "../task/infrastructure/dependency/injectionControl";
import { landingpage } from "../views/layout/main";

export const app: App = new App();
app.start().then( () =>{
	try {
		const appExpress = app.server?.getExpress();
		if(!appExpress){
			throw new Error ("Error starting express server");
		}

		const control = controlInjection();
		appExpress.get('/',(req, res ) =>{res.send(landingpage)});
		appExpress.get('/tasks/:id', control.getTaskIdController);
		appExpress.get('/tasks', control.getAllTasksController);
		appExpress.post('/tasks', control.postCreateTaskController);
		appExpress.patch('/tasks/:id', control.patchTaskStatusController);
		appExpress.delete('/tasks/:id', control.deleteTaskController);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
});
process.on("uncaughtException", () => {
	process.exit(1);
});