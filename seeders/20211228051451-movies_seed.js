'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fields = [{
      title : 'movie1',
      synopsis: 'movie1',
      release_date: '26.11.1996',
      rating : 0,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'movie2',
      synopsis: 'movie2',
      release_date: '26.11.1996',
      rating : 0,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'movie3',
      synopsis: 'movie3',
      release_date: '26.11.1996',
      rating : 0,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'movie4',
      synopsis: 'movie4',
      release_date: '26.11.1996',
      rating : 0,
      categoryId: 2,
      createdAt: new Date(),
      updatedAt:  new Date()
    },
    {
      title : 'movie5',
      synopsis: 'movie5',
      release_date: '26.11.1996',
      rating : 0,
      categoryId: 1,
      createdAt: new Date(),
      updatedAt:  new Date()
    }]

    return queryInterface.bulkInsert('Movies', fields, {});
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Movies', null, {});
  }
};
