const User = require('../../models').User;
const Session = require('../../models').Session;
const UserCache = require('./userCache');
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async getUser(req, res) {
		try {
			const { user } = req.body;
			let isInCache = true;
			let userCollection = UserCache.getItem(user.email);
			if (!userCollection) {
				isInCache = false;
				userCollection = await User.findAll({
					where: {
						email: user.email,
					},
				});
			}
			let userData;
			if (isInCache) {
				userData = userCollection;
			} else {
				userData = userCollection.length ? userCollection[0] : null;
			}
			if (userData) {
				if (userData.password === user.password) {
					const token = uuidv4();
					const [session, created] = await Session.findOrCreate({
						where: { userId: userData.id },
						defaults: {
							token,
							status: true,
							userId: userData.id,
						},
					});
					if (!created) {
						session.token = token;
						session.status = true;
						await session.save();
					}
					UserCache.setItem(userData);
					res.status(200).json({
						status: true,
						data: {
							id: userData.id,
							email: userData.email,
						},
						token,
						isInCache,
					});
				} else {
					res.status(200).json({
						status: false,
						message: 'wrong email or password',
					});
				}
			} else {
				res.status(200).json({
					status: false,
					message: 'email not registered.',
				});
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},

	async logout(req, res) {
		try {
			const { user } = req.body;
			const sessionInstance = await Session.findAll({
				where: {
					userId: user.id,
					status: true,
				},
			});
			if (sessionInstance.length) {
				await sessionInstance[0].update({
					status: false,
					token: '',
				});
				res.status(200).json({
					status: true,
					message: 'logout successful.',
				});
			} else {
				res.status(200).json({
					status: false,
					message: 'user already logout.',
				});
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	},

	async getAllUsers(req, res) {
		try {
			let usersCollection = UserCache.USERS_CACHE.data;
			if (usersCollection.length === 0) {
				usersCollection = await User.findAll({});
			}
			res.status(200).json(usersCollection);
		} catch (e) {
			console.log(e);

			res.status(500).send(e);
		}
	},

	async create(req, res) {
		try {
			const userCreatedCollection = await User.create({
				email: req.body.email,
				password: req.body.password,
			});
			const usersCollection = await User.findAll({});
			UserCache.setItems[usersCollection];
			res.status(201).send(userCreatedCollection);
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	},

	async update(req, res) {
		try {
			const userCollection = await User.find({
				id: req.params.userId,
			});

			if (userCollection) {
				const updatedUser = await User.update({
					id: req.body.email,
				});

				res.status(201).send(updatedUser);
			} else {
				res.status(404).send('User Not Found');
			}
		} catch (e) {
			console.log(e);

			res.status(500).send(e);
		}
	},
};
