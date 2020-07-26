const request = require('supertest');
const express = require('express');
const app = express();

const API_VERSION = '/api/v1';

app.use(
	express.urlencoded({
		extended: false,
	})
);

require('./server/router/v1')(app);

describe('V1 Routes', () => {
	test('index route works', done => {
		request(app)
			.get('/api/v1')
			.expect('Content-Type', /json/)
			.expect({ data: 'Welcome to IVI API v1' })
			.expect(200, done);
	});
});
