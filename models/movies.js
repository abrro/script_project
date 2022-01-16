'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categories, {foreignKey: 'categoryId', as: 'category'});
      this.hasMany(models.Reviews, { foreignKey: 'movieId', as: 'reviews', onDelete: 'cascade', hooks: true });
      
      this.belongsToMany(models.Celebrities, {through: 'Crew', foreignKey: 'movieId', as: 'celebrities'});
      this.belongsToMany(models.Roles, {through: 'Crew', foreignKey: 'movieId', as: 'roles'});
    }
  };
  Movies.init({
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
    }
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};