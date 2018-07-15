const logError = require('../utils/logError');
const Wish = require('../model/wish');
const { handleError, handleResult } = require('../utils/handle');

exports.getWishes = async ctx => {
  const { pageNo, pageSize } = ctx.query;
  const querys = {};
  const options = {
    page: Number(pageNo),
    limit: Number(pageSize),
  };

  const result = await Wish.paginate(querys, options).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '获取留言列表成功',
    fail: '获取留言列表失败',
    deal: data => ({
      total: data.total,
      list: data.docs,
    }),
  });
};

exports.addWish = async ctx => {
  const result = await new Wish(ctx.request.body)
    .save()
    .catch(logError({ ctx }));

  handleResult({
    ctx,
    result,
    success: '添加留言成功',
    fail: '添加留言失败',
  });
};

exports.delWish = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await Wish.findByIdAndRemove(id).catch(logError({ ctx }));
  handleResult({
    ctx,
    result,
    success: '删除留言成功',
    fail: '删除留言失败',
  });
};
