module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define('Like', {
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'likes',
    classMethods: {
      associate: function(models) {
        models.Like.belongsTo(models.Post, {foreignKey: 'post_id'});
        models.Like.belongsTo(models.User, {foreignKey: 'user_id'});
        // associations can be defined here
      }
    }
  });
  return Like;
};