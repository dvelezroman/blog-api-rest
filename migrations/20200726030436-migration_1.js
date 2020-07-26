'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn('Sessions', 'token', {
			type: Sequelize.STRING,
			allowNull: false,
		});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.addColumn('Sessions', 'token');
	},
};

// UPDATE MIGRATION
// node_modules/.bin/sequelize db:migrate
// CREATE MIGRATION
// node_modules/.bin/sequelize migration:create --name migration_1
