const User = require('../../models').User;
module.exports = {
	async getUser(req, res) {
		try {
			const { user } = req.body;
			const userCollection = await User.findAll({
				where: {
					email: user.email,
				},
			});
			if (userCollection.length) {
				const userData = userCollection[0];
				if (userData.password === user.password) {
					res.status(200).json({
						status: true,
						data: {
							email: user.email,
						},
					});
				} else {
					res.status(200).json({
						status: false,
						message: 'wrong email or password',
					});
				}
			}
			res.status(200).json({
				status: false,
				message: 'email not registered.',
			});
		} catch (e) {
			res.status(400).send(e.message);
		}
	},

	async getAllUsers(req, res) {
		try {
			const userCollection = await User.findAll({});
			res.status(200).json(userCollection);
		} catch (e) {
			console.log(e);

			res.status(500).send(e);
		}
	},

	async create(req, res) {
		try {
			const userCollection = await User.create({
				email: req.body.email,
				password: req.body.password,
			});

			res.status(201).send(userCollection);
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
