//SESSION Schema
module.exports = (sequelize, DataTypes) => {
	let Session = sequelize.define('Session', {
		status: DataTypes.BOOLEAN,
	});

	Session.associate = function (models) {
		Session.belongsTo(models.User, {
			onDelete: 'CASCADE',
			foreignKey: 'userId',
		});
	};

	return Session;
};
