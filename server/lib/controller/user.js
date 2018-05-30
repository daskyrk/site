const crypto = require('crypto');
const User = require('../model/user');
const { handleError, handleSuccess } = require('../utils/handle');

const encrypt = data =>
  crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');

exports.login = async ctx => {
  const { username, password } = ctx.request.body;
  if (!password) {
    return handleError({ ctx, msg: '请输入密码' });
  }

  let result = await User.findOne({
    username,
  }).catch(err => ctx.throw(500, '服务器内部错误'));
  let msg = '';

  if (result) {
    if (result.password === encrypt(password)) {
      handleSuccess({
        ctx,
        result,
        msg: '登陆成功',
      });
    } else {
      handleError({
        ctx,
        msg: '登陆失败, 密码错误',
      });
    }
  } else {
    handleError({
      ctx,
      msg: '登陆失败, 用户不存在',
    });
  }
};

exports.getUser = async ctx => {
  const { username, password } = ctx.query;

  const result = await User.findOne({
    username,
  }).catch(err => ctx.throw(500, '服务器内部错误'));

  if (result) {
    handleSuccess({
      ctx,
      result,
      msg: '获取用户信息成功',
    });
  } else {
    handleError({
      ctx,
      msg: '获取用户信息失败',
    });
  }
};

exports.addUser = async ctx => {
  const { password, ...rest } = ctx.request.body;

  const result = await new User({ password: encrypt(password), ...rest })
    .save()
    .catch(err => ctx.throw(500, err)); // TODO: 统一抛出错误并记录错误日志

  if (result) {
    handleSuccess({
      ctx,
      result,
      msg: '添加用户成功',
    });
  } else {
    handleError({
      ctx,
      msg: '添加用户失败',
    });
  }
};

exports.delUser = async ctx => {
  const username = ctx.query.username;
  if (!username) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const res = await User.findOneAndRemove({ username }).catch(err =>
    ctx.throw(500, '服务器内部错误'),
  );
  if (res) {
    handleSuccess({
      ctx,
      msg: '删除用户成功',
    });
  } else {
    handleError({
      ctx,
      msg: '删除用户失败',
    });
  }
};
