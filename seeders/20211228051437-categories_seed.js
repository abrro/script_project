'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      label : 'horror',
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      label : 'drama',
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Categories', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
