const request = require('supertest');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const API_VERSION = '/api/v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./v1')(app);

let createdUser = null;

describe('API V1 Routes', () => {
	test('index route works', done => {
		request(app)
			.get('/api/v1')
			.expect('Content-Type', /json/)
			.expect({ data: 'Welcome to IVI API v1' })
			.expect(200, done);
	});
	// describe('/api/v1/users', () => {
	// 	test('get users - no users created', done => {
	// 		request(app)
	// 			.get('/api/v1/users')
	// 			.expect('Content-Type', /json/)
	// 			.expect(response => {
	// 				expect(response.status).toBe(200);
	// 				expect(response.body.data.length).toBe(0);
	// 			})

	// 			.expect(200, done);
	// 	});
	// 	test('create a user', done => {
	// 		let user = {
	// 			email: 'dario@gmail.com',
	// 			password: '1234',
	// 		};
	// 		request(app)
	// 			.post(`${API_VERSION}/users/create`)
	// 			.send(user)
	// 			.set('Accept', /application\/json/)
	// 			.expect('Content-Type', /json/)
	// 			.expect(response => {
	// 				expect(response.status).toBe(200);
	// 				expect(response.body.data.length).toBe(0);
	// 			})
	// 			.expect(201, done);
	// 	});
	// 	test('get users - now we have one user created', done => {
	// 		request(app)
	// 			.get('/api/v1/users')
	// 			.expect('Content-Type', /json/)
	// 			.expect(response => {
	// 				expect(response.status).toBe(200);
	// 				expect(response.body.data.length).toBe(1);
	// 			})

	// 			.expect(200, done);
	// 	});
	// 	test('login', done => {
	// 		let user = {
	// 			email: 'dario@gmail.com',
	// 			password: '1234',
	// 		};
	// 		request(app)
	// 			.post(`${API_VERSION}/users/login`)
	// 			.send({ user })
	// 			.set('Accept', /application\/json/)
	// 			.expect('Content-Type', /json/)
	// 			.expect(response => {
	// 				expect(response.status).toBe(200);
	// 				expect(response.body.status).toBe(true);
	// 				createdUser = response.body.data;
	// 			})
	// 			.expect(200, done);
	// 	});
	// });
	// Testing posts routes
	describe('/api/v1/posts', () => {
		const loggedUser = {
			email: 'dario@gmail.com',
			password: '1234',
		};
		test('get posts - no posts created', done => {
			request(app)
				.get('/api/v1/posts')
				.expect('Content-Type', /json/)
				.expect(response => {
					expect(response.status).toBe(200);
					expect(response.body.data.length).toBe(0);
				})

				.expect(200, done);
		});
		test('create a post', done => {
			const newPost = {
				title: 'Post 1',
				content: 'Content for post 1',
				type: 'public',
				userId: createdUser.id, // this is the id of the user created in the above section
			};
			request(app)
				.post('/api/v1/posts/create')
				.expect('Content-Type', /json/)
				.expect(response => {
					expect(response.status).toBe(200);
				})
				.expect(201, done);
		});
		test('get posts - one post', done => {
			request(app)
				.get('/api/v1/posts')
				.expect('Content-Type', /json/)
				.expect(response => {
					expect(response.status).toBe(200);
					expect(response.body.data.length).toBe(1);
				})

				.expect(200, done);
		});
	});
});
