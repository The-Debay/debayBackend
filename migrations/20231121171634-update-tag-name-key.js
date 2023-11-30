'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove the existing unique constraint on the name column
    await queryInterface.changeColumn('tags', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Set to false to remove the uniqueness constraint
    });
  },

  async down(queryInterface, Sequelize) {
    // This is a simplified down migration. Adjust it if needed based on your application's requirements.
    await queryInterface.changeColumn('tags', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Set back to true if it was originally unique
    });
  },
};
