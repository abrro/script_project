'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Crews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'movies',
          key:'id'
          }
      },
      celebrityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'celebrities',
          key:'id'
          }
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'roles',
          key:'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    // }, {
    //   uniqueKeys : {
    //     Items_unique: {
    //       fields: ['movieId', 'celebrityId', 'roleId']
    //     }
    //   }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Crews');
  }
};