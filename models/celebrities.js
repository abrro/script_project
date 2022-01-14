'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Celebrities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Movies, {through: 'Crew', foreignKey: 'celebrityId', as: 'movies'});
      //this.belongsToMany(models.Roles, {through: 'Crew', foreignKey: 'celebrityId', as: 'roles'});
    }
  };
  Celebrities.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type : DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Celebrities',
  });
  return Celebrities;
};