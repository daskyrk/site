const Router = require('koa-router')
const config = require('./config')
const controller = require('./controller')

const router = new Router({
	prefix: config.APP.ROOT_PATH
})

console.log('controller:', controller);

router.get('/article', controller.article.getArts)

module.exports = router