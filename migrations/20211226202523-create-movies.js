'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false
      },
      release_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'categories',
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
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Movies');
  }
};