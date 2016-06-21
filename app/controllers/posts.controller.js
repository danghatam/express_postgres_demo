var db = global.db;
var router = require('express').Router();

module.exports = function (app) {
  app.use('/api/posts', router);
  router.route('/hot')
    .get(function (req, res) {
      db.sequelize.query(
        "SELECT posts.id, content, username "
        + "FROM posts "
        + "INNER JOIN likes on posts.id = likes.post_id "
        + "INNER JOIN users on posts.user_id = users.id "
        + "WHERE likes.created_at <= (posts.created_at + '1 hour') "
        + "GROUP BY posts.id, username " 
        + "HAVING count(likes.id) > 4 "
        + "ORDER BY posts.id",
        { type: db.sequelize.QueryTypes.SELECT}
      )
      .then(function(posts) {
        res.json({records: posts});
      });
    });

  router.route('/recent')
    .get(function (req, res) {
      db.Post.findAll({
        attributes: ['id', 'content', 'created_at'],
        order: 'created_at DESC',
        include: [
          {
            model: db.User,
            attributes: ['username']
          }
        ]
      }).then( function(posts) {
        var records = posts.map( function(post) {
          return {
            id: post.id,
            content: post.content,
            username: post.User.username
          };
        });
        res.json({records: records});
      });
    });
};

