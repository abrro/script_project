'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      name : 'Meryl',
      lastname: 'Streep',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Sean',
      lastname: 'Connery',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      name : 'Jane',
      lastname: 'Fonda',
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Celebrities', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Celebrities', null, {});
  }
};
