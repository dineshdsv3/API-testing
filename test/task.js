let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

// Assertion style
chai.should();
chai.use(chaiHttp);

describe('Tasks API', () => {
	// Testing the GET route
	describe('GET /api/tasks', () => {
		it('It should get all tasks', (done) => {
			chai.request(server)
				.get('/api/tasks')
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array');
					response.body.length.should.be.eq(3);
					done();
				});
		});

		it('It should not get all tasks wrong url', (done) => {
			chai.request(server)
				.get('/api/task')
				.end((err, response) => {
					response.should.have.status(404);
					done();
				});
		});
	});

	// Testing the GET (by Id) route
	describe('GET /api/tasks/:id', () => {
		it('It should GET a task by ID', (done) => {
			const taskId = 1;
			chai.request(server)
				.get('/api/tasks/' + taskId)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('id');
					res.body.should.have.property('name');
					res.body.should.have.property('completed');
					res.body.should.have.property('id').eq(1);
					done();
				});
		});

		it('It should NOT GET a task by ID', (done) => {
			const taskId = 123;
			chai.request(server)
				.get('/api/tasks/' + taskId)
				.end((err, res) => {
					res.should.have.status(404);
					res.text.should.be.eq('The task with the provided ID does not exist.');
					done();
				});
		});
	});

	// Test the POST route
	describe('POST /api/tasks', () => {
		it('It should POST a new task', (done) => {
			const task = {
				name: 'Task 4',
				completed: false,
			};
			chai.request(server)
				.post('/api/tasks')
				.send(task)
				.end((err, response) => {
					response.should.have.status(201);
					response.body.should.be.a('object');
					response.body.should.have.property('id').eq(4);
					response.body.should.have.property('name').eq('Task 4');
					response.body.should.have.property('completed').eq(false);
					done();
				});
		});

		it('It should NOT POST a new task without the name property', (done) => {
			const task = {
				completed: false,
			};
			chai.request(server)
				.post('/api/tasks')
				.send(task)
				.end((err, response) => {
					response.should.have.status(400);
					response.text.should.be.eq('The name should be at least 3 chars long!');
					done();
				});
		});
	});

	// Test the PUT route
	// Test the PATCH route
	// Test the DELETE route
});
