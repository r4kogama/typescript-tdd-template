import { Task } from "../../../../src/task/domain/entities/task";
const request = require('supertest');
import {app} from '../../../../src/backend/server.start';
describe("Task", () => {
	beforeEach( () =>{});
	test("Crear un objeto tarea, cuando se llama al método getNote, debe devolver los datos de la tarea", () => {
		const task = new Task("comprar", "ir a comprar al super");
		const expectedGreeting = {name: "comprar", content : "ir a comprar al super", status:"pending"};
		const greeting = task.getNote();
		expect(greeting).toEqual(expectedGreeting);
	});
});

describe('POST /tasks', function() {

	it('Responds with json', async () => {
		await request(app)
		.post('/tasks')
		.send({name:'Tarea', content: "Descripcion tarea"})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(201)
		.then((request:Request) => {
			const{name, content} = request.body as unknown as{ name: string, content: string};
			expect(name).toEqual('Tarea');
			expect(content).toEqual('Descripcion tarea');
		})
	});
});
 describe('GET /tasks/id', function() {
	it('Responds with json', async () => {
		await request(app)
		.get('/tasks/1')
		.set('Accept', 'application/json')
		.then((response:Response) => {
			expect(response.status).toEqual(200);
			console.log(response)
			//expect(response.body).toEqual('Tarea');
		})
	});
}); 

afterAll(()=>{
	
})
