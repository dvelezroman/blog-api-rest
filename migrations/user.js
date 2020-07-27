module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable(
			'Users',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: 'unique_tag',
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			{
				uniqueKeys: {
					unique_tag: {
						customIndex: true,
						fields: ['email'],
					},
				},
			}
		),
	down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};
