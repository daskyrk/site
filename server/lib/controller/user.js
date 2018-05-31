const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logError = require('../utils/logError');
const User = require('../model/user');
const { handleError, handleSuccess, handleResult } = require('../utils/handle');

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
  }).catch(logError({ ctx }));
  let msg = '';

  if (result) {
    if (result.password === encrypt(password)) {
      // const expTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
      // const token = jwt.sign(
      //   { name: result.username, password: result.password, expTime },
      //   config.AUTH.secretKey,
      // );
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
  }).catch(logError({ ctx }));

  handleResult({
    ctx,
    result,
    success: '获取用户信息成功',
    fail: '获取用户信息失败',
  });
};

exports.addUser = async ctx => {
  const { password, ...rest } = ctx.request.body;

  const result = await new User({ password: encrypt(password), ...rest })
    .save()
    .catch(logError({ ctx }));

  handleResult({
    ctx,
    result,
    success: '添加用户成功',
    fail: '添加用户失败',
  });
};

exports.delUser = async ctx => {
  const username = ctx.query.username;
  if (!username) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await User.findOneAndRemove({ username }).catch(
    logError({ ctx }),
  );
  handleResult({
    ctx,
    result,
    success: '删除用户成功',
    fail: '删除用户失败',
  });
};
