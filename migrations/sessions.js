module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('Sessions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Users',
					key: 'id',
					as: 'userId',
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		}),
	down: (queryInterface /* , Sequelize */) =>
		queryInterface.dropTable('Sessions'),
};
