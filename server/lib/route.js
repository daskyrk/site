const Router = require('koa-router');
const { requireAll } = require('./utils');
const config = require('./config');
const router = new Router({
  prefix: config.APP.prefix,
});

const controller = requireAll(__dirname + '/controller', false, /(\w|-)+\.js$/);

router
  .get('/article', controller.article.getArts)
  .post('/admin/article', controller.article.addArt)
  .put('/admin/article/:id', controller.article.updateArt)
  .get('/article/:id', controller.article.getArt)
  .delete('/admin/article/:id', controller.article.delArt)
  .put('/likeArt/:id', controller.article.likeArt)

  .post('/user', controller.user.addUser)
  .get('/user', controller.user.getUser)
  .delete('/user', controller.user.delUser)
  .put('/admin/user/updateConfig', controller.user.updateConfig)
  .post('/login', controller.user.login)
  .get('/user/registerable', controller.user.checkRegisterable)

  .get('/tag', controller.tag.getTags)
  .post('/admin/tag', controller.tag.addTag)
  .put('/admin/tag/:id', controller.tag.updateTag)
  .delete('/admin/tag/:id', controller.tag.delTag)

  .get('/comment', controller.comment.getComments)
  .post('/comment', controller.comment.addComment)
  .put('/likeComment/:id', controller.comment.likeComment)

  .get('/uploadToken', controller.upload.getToken);

module.exports = router;
