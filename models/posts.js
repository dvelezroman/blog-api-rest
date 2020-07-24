const { ENUM } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	let Post = sequelize.define('Post', {
		title: DataTypes.STRING,
		type: {
			type: ENUM,
			values: ['draft', 'private', 'public'],
		},
		content: {
			type: DataTypes.STRING,
		},
	});

	Post.associate = function (models) {
		Post.belongsTo(models.User, {
			onDelete: 'CASCADE',
			foreignKey: 'userId',
		});
	};

	return Post;
};
