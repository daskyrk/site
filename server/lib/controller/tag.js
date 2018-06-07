const logError = require('../utils/logError');
const Tag = require('../model/tag');
const { handleError, handleResult } = require('../utils/handle');

exports.getTags = async ctx => {
  const { pageNo, pageSize } = ctx.query;
  const querys = {};
  const options = {
    page: Number(pageNo),
    limit: Number(pageSize),
  };

  const result = await Tag.paginate(querys, options).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '获取标签列表成功',
    fail: '获取标签列表失败',
    deal: data => ({
      total: data.total,
      list: data.docs,
    }),
  });
};

exports.addTag = async ctx => {
  const result = await new Tag(ctx.request.body)
    .save()
    .catch(logError({ ctx }));

  handleResult({
    ctx,
    result,
    success: '添加标签成功',
    fail: '添加标签失败',
  });
};

exports.updateTag = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await Tag.findByIdAndUpdate(id, ctx.request.body).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '更新标签成功',
    fail: '更新标签失败',
  });
};

exports.delTag = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await Tag.findByIdAndRemove(id).catch(logError({ ctx }));
  handleResult({
    ctx,
    result,
    success: '删除标签成功',
    fail: '删除标签失败',
  });
};
