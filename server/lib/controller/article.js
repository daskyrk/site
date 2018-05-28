const Article = require('../model/article');
const { handleError, handleSuccess } = require('../utils/handle')

exports.getArts = async (ctx) => {
  const result = await Article
    .paginate()
    .catch(err => ctx.throw(500, '服务器内部错误'))

  if (result) {
    handleSuccess({
      ctx, result: {
        total: result.total,
        list: result.docs,
      }, msg: '获取文章列表成功'
    })
  } else {
    handleError({ ctx, msg: '获取文章列表失败' })
  }
}

exports.getArt = async (ctx) => {
  const id = ctx.params.id;
  if (!id) {
    handleError({ ctx, msg: '无效的参数' })
  }

  const result = await Article
    .findById(id)
    .catch(err => ctx.throw(500, '服务器内部错误'))

  if (result) {
    handleSuccess({
      ctx, result, msg: '获取文章详情成功'
    })
  } else {
    handleError({ ctx, msg: '获取文章详情失败' })
  }
}

exports.saveArt = async (ctx) => {
  const result = await new Article(ctx.request.body)
    .save()
    .catch(err => ctx.throw(500, '服务器内部错误'));

  if (result) {
    handleSuccess({ ctx, msg: '添加文章成功', result })
  } else {
    handleError({ ctx, msg: '添加文章失败' })
  }
}

exports.updateArt = async (ctx) => {
  const id = ctx.params.id;
  if (!id) {
    handleError({ ctx, msg: '无效的参数' })
  }

  const result = await Article
    .findByIdAndUpdate(id, ctx.request.body)
    .catch(err => ctx.throw(500, '服务器内部错误'))

  if (result) {
    handleSuccess({ ctx, msg: '更新文章成功' })
  } else {
    handleError({ ctx, msg: '更新文章失败' })
  }
}

exports.delArt = async (ctx) => {
  const id = ctx.params.id;
  if (!id) {
    handleError({ ctx, msg: '无效的参数' })
  }

  const res = await Article
    .findByIdAndRemove(id)
    .catch(err => ctx.throw(500, '服务器内部错误'))
  if (res) {
    handleSuccess({ ctx, msg: '删除文章成功' })
  } else {
    handleError({ ctx, msg: '删除文章失败' })
  }
}