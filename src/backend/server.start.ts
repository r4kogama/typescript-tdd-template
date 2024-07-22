import { App } from "./App";


const app: App = new App();
app.start().then( () =>{
	try {
	
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
});
process.on("uncaughtException", () => {
	process.exit(1);
});

