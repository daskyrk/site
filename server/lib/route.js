const Router = require('koa-router')
const config = require('./config')
const controller = require('./controller')

const router = new Router({
	prefix: config.APP.ROOT_PATH
})


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


module.exports = router