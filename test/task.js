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
                done()
				});
		});

		it('It should not get all tasks wrong url', (done) => {
			chai.request(server)
				.get('/api/task')
				.end((err, response) => {
					response.should.have.status(404);
                done()
				});
		});
	});

	// Testing the GET (by Id) route
	// Test the POST route
	// Test the PUT route
	// Test the PATCH route
	// Test the DELETE route
});
