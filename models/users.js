//USER Schema
module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define(
		'User',
		{
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: DataTypes.STRING,
		},
		{
			indexes: [
				{
					unique: true,
					fields: ['email'],
				},
			],
		}
	);

	User.associate = function (models) {
		User.hasMany(models.Post, {
			foreignKey: 'userId',
			as: 'posts',
		});
	};
	return User;
};
