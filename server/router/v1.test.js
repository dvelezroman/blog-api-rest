const request = require('supertest');
const bodyParser = require('body-parser');
const express = require('express');
const { response } = require('express');
const app = express();

const API_VERSION = '/api/v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./v1')(app);

// on the tests
afterAll(() => app.close());

describe('V1 Routes', () => {
	test('index route works', done => {
		request(app)
			.get('/api/v1')
			.expect('Content-Type', /json/)
			.expect({ data: 'Welcome to IVI API v1' })
			.expect(200, done);
	});
	// test('create a user', done => {
	// 	let user = {
	// 		email: 'dario@gmail.com',
	// 		password: '1234',
	// 	};
	// 	request(app)
	// 		.post(`${API_VERSION}/users/create`)
	// 		.send(user)
	// 		.set('Accept', /application\/json/)
	// 		.expect('Content-Type', /json/)
	// 		.expect(400, done);
	// });
	test('get users route works', done => {
		request(app)
			.get('/api/v1/users')
			.expect('Content-Type', /json/)
			.expect(response => {
				expect(response.status).toBe(200);
				expect(response.body.data.length).toBe(1);
			})

			.expect(200, done);
	});
	test('login', done => {
		let user = {
			email: 'dario@gmail.com',
			password: '1234',
		};
		request(app)
			.post(`${API_VERSION}/users/login`)
			.send({ user })
			.set('Accept', /application\/json/)
			.expect('Content-Type', /json/)
			.expect(response => {
				expect(response.status).toBe(200);
				expect(response.body.status).toBe(true);
			})
			.expect(200, done);
	});
});
