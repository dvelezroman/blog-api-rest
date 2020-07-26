const userController = require('../controller/user');
const postController = require('../controller/post');

const API_VERSION = '/api/v1';

module.exports = app => {
	app.get(`${API_VERSION}`, (req, res) => {
		res.status(200).send({
			data: 'Welcome to IVI API v1',
		});
	});

	app.post(`${API_VERSION}/users/login`, userController.getUser);

	app.post(`${API_VERSION}/users/logout`, userController.logout);

	app.post(`${API_VERSION}/users/create`, userController.create);

	app.put(`${API_VERSION}/users/:userId`, userController.update);

	app.get(`${API_VERSION}/users`, userController.getAllUsers);

	app.post(`${API_VERSION}/posts/create`, postController.createPost);

	app.put(`${API_VERSION}/posts/:postId`, postController.update);

	app.get(`${API_VERSION}/posts`, postController.getAllPostsOfUser);
};
