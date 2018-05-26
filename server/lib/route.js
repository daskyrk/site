const Router = require('koa-router')
const config = require('./config')
const controller = require('./controller')

const router = new Router({
	prefix: config.APP.ROOT_PATH
})

console.log('controller:', controller);

router
	.get('/article', controller.article.getArts)
	.post('/article', controller.article.saveArt)
	.put('/article/:id', controller.article.updateArt)
	.delete('/article/:id', controller.article.delArt)


module.exports = router