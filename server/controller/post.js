const Post = require('../../models').Post;
const User = require('../../models').User;
const { Op } = require('sequelize');

module.exports = {
	async getAllPosts(req, res) {
		try {
			const postCollection = await Post.findAll({
				where: {
					type: 'public',
				},
				include: User,
			});

			res.status(200).json({
				status: true,
				data: postCollection,
			});
		} catch (e) {
			console.log(e);
			res.status(500).send(e);
		}
	},

	async getMyDraftPosts(req, res) {
		try {
			const postCollection = await Post.findAll({
				where: {
					type: 'draft',
					userId: req.params.userId,
				},
			});

			res.status(200).json({
				status: true,
				data: postCollection,
			});
		} catch (e) {
			console.log(e);
			res.status(500).send(e);
		}
	},

	async filterPostsBy(req, res) {
		try {
			const foundPosts = await Post.findAll({
				where: {
					content: {
						[Op.like]: '%' + req.body.query + '%',
					},
					type: 'public',
				},
				include: User,
			});
			res.status(200).json({
				status: true,
				data: foundPosts,
			});
		} catch (e) {
			console.log(e);
			res.status(500).send(e);
		}
	},

	async getAllPostsOfUser(req, res) {
		try {
			const userCollection = await User.findAll({
				where: { id: req.params.userId },
			});
			if (userCollection.length) {
				const postCollection = await Post.findAll({
					userId: req.params.userId,
				});

				res.status(200).json({
					status: true,
					data: postCollection,
				});
			} else {
				res.status(200).json({
					status: false,
					message: 'User Not Found',
				});
			}
		} catch (e) {
			console.log(e);
			res.status(500).send(e);
		}
	},

	async createPost(req, res) {
		try {
			const post = await Post.create({
				title: req.body.title,
				type: req.body.type,
				content: req.body.content,
				userId: req.body.userId,
			});
			res.status(201).json({
				status: true,
				message: 'Post successfully created.',
				data: post,
			});
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	},

	async delete(req, res) {
		try {
			const deletedPost = await Post.destroy({
				where: {
					id: req.body.postId,
					userId: req.body.userId,
				},
			});

			if (deletedPost) {
				res.status(201).json({
					status: true,
					message: 'Post successfully destroyed.',
				});
			}
			res.status(200).json({
				status: true,
				message: 'You are not the owner of this post.',
			});
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	},

	async update(req, res) {
		try {
			const postCollection = await Post.findAll({
				id: req.params.postId,
			});

			if (postCollection) {
				const updatedPost = await postCollection.update({
					title: req.body.title,
				});

				res.status(201).send(updatedPost);
			} else {
				res.status(404).send('Post Not Found');
			}
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	},
};
