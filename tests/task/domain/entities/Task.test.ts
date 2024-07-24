import { Task } from "../../../../src/task/domain/entities/task";
import request from 'supertest';
import { Server } from "../../../../src/backend/Server";
import { App } from "supertest/types";
import { Note } from "../../../../src/task/domain/entities/note";
import { taskNotes, emptyTask, updateTask, saveTask} from "./helpers";



let app: App;

beforeEach( async () =>{
	let server : Server =  new Server('8000');
	app = server.getExpress();
	//await saveTask();
});

  

 describe("Routes Api rest Task ", () => {
	test("Compare a create a task object with the correct format", () => {
		const task = new Task("comprar", "ir a comprar al super");
		const expectedGreeting = {name: "comprar", content : "ir a comprar al super", status:"pending"};
		const greeting = task.getNote();
		expect(greeting).toEqual(expectedGreeting);
	});
});

describe('GET /tasks', function() {

	test('The Api returned as json ',  async  () =>  {
		request(app)
		  .get('/v1/api/tasks')
		  .expect(200)
		  .expect('Content-Type', '/application\/json/')
	  });

	/* test('There are 3 task save in the BBDD', async () => {
		const res = await request(app)
		.get('/v1/api/tasks/all')
		expect(res.body.data).toHaveLength(taskNotes.length);
	}); */  
});
 describe('POST /tasks', function() {

	test('if content of the task is empty not save',  async  () =>  {
		const res = await request(app)
		  .post('/v1/api/tasks')
		  .send(emptyTask)
		  .set('Accept', 'application/json')
		  .expect('Content-Type', 'application/json; charset=utf-8')
		  .expect(400)
			
		  const response = await request(app)
		  .get('/v1/api/tasks/all')
		  expect(response.body.message).toContain('Not found')
	  });
	test('Create a task with all property and values',  async  () =>  {
		const res = await request(app)
		  .post('/v1/api/tasks')
		  .send(taskNotes[0])
		  .set('Accept', 'application/json')
		  .expect('Content-Type', 'application/json; charset=utf-8')
		  .expect(201)
		  expect(res.body.data.name).toEqual('comprar')
		  expect(res.body.data.content).toEqual('ir al super')
		  expect(res.body.data.status).toEqual('pending')
		  expect(res.body.data).toHaveProperty('name')
		  expect(res.body.data).toHaveProperty('content')
		  expect(res.body.data).toHaveProperty('status')
	  });
	test('Create task and check that it is created',  async  () =>  {
		const res = await request(app)
		  .post('/v1/api/tasks')
		  .send(taskNotes[1])
		  .set('Accept', 'application/json')
		  .expect('Content-Type', 'application/json; charset=utf-8')
		  .expect(201)

		  const response = await request(app)
		  .get('/v1/api/tasks/all')
		  const contents = response.body.data.map(([idx, note]: [string, Note]) => note.content);
		  expect(contents).toContain(taskNotes[1].content)
	  });
	


});  
describe('GET /tasks/all', function() {
	
	test('Get alls the task created', async () => {
		const res = await request(app)
		.get('/v1/api/tasks/all')
		.set('Accept', 'application/json')
		const contents = res.body.data.map(([idx, note]: [string, Note]) => note.content);
		expect(contents).toContain(taskNotes[1].content)
		expect(contents).toContain(taskNotes[0].content)
	});  


}); 
describe('GET /tasks/id', function() {
	
	test('Get a task by id param', async () => {
		const res = await request(app)
		.get('/v1/api/tasks/1')
		.set('Accept', 'application/json')
		.expect('Content-Type', 'application/json; charset=utf-8')
		expect(res.status).toEqual(200);
		expect(res.body.data.name).toEqual('comprar');
	}); 


}); 

 describe('PATCH /tasks/id', function() {
	
	test('A task can update its status to completed', async () => {
		const res = await request(app)
		.patch('/v1/api/tasks/1')
		.send(updateTask)
		.set('Accept', 'application/json')
		expect(res.status).toEqual(200);
		expect(res.body.data.name).toEqual('comprar');
	}); 
	test('Check the update of the new task status', async () => {
		const res = await request(app)
		.get('/v1/api/tasks/1')
		.expect(200)
		expect(res.body.data.status).toEqual('completed');
		expect(res.body.data.name).toEqual('comprar');
	}); 


});  

describe('DELETE /tasks/id', function() {
	
	test('a task can delete with a id', async () => {
		const res = await request(app)
		.delete('/v1/api/tasks/1')
		.set('Accept', 'application/json')
		expect(res.status).toEqual(200);
		expect(res.body.data.name).toEqual('comprar');
	}); 

	test('The current deleted task no longer exists', async () => {
		const res = await request(app)
		.get('/v1/api/tasks/1')
		.expect(404)
		expect(res.body.message).toContain('Not found')
	}); 

	test('a task with id no valid, can not be deleted', async () => {
		const res = await request(app)
		  .delete('/v1/api/tasks/9999')
		  .expect(404)
		  expect(res.body.message).toContain('Not found')
	  })

}); 


afterAll(()=>{
})
 