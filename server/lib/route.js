const Router = require('koa-router')
const {requireAll} = require('./utils');
const config = require('./config')
const router = new Router({
	prefix: config.APP.ROOT_PATH
})

const controller = requireAll(__dirname + '/controller', false, /(\w|-)+\.js$/);

router
	.get('/article', controller.article.getArts)
	.post('/article', controller.article.addArt)
	.put('/article/:id', controller.article.updateArt)
	.get('/article/:id', controller.article.getArt)
	.delete('/article/:id', controller.article.delArt)
	.get('/article', controller.article.getArts)

	.post('/user', controller.user.addUser)
	.get('/user', controller.user.getUser)
	.delete('/user', controller.user.delUser)
	.post('/login', controller.user.login)

	.get('/tag', controller.tag.getTags)
	.post('/tag', controller.tag.addTag)
	.put('/tag/:id', controller.tag.updateTag)
	.delete('/tag/:id', controller.tag.delTag)

	.get('/uploadToken', controller.upload.getToken)


module.exports = router