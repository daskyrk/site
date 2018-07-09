const { cryptoUtil } = require('../utils');
const logError = require('../utils/logError');
const { generateToken, verifyToken, getToken } = require('../utils/auth');
const User = require('../model/user');
const { handleError, handleSuccess, handleResult } = require('../utils/handle');

const sha256 = cryptoUtil.sha256;

exports.login = async ctx => {
  const { username, password } = ctx.request.body;
  if (!password) {
    return handleError({ ctx, msg: '请输入密码' });
  }

  let userInfo = await User.findOne({
    username,
  }).catch(logError({ ctx }));

  if (userInfo) {
    if (userInfo.password === sha256(password)) {
      const maxAge = 1000 * 60 * 60 * 24 * 7;
      const expireTime = Date.now() + maxAge;
      const token = generateToken({
        name: userInfo.username,
        password: userInfo.password,
        expireTime,
      });
      ctx.cookies.set('token', token, { httpOnly: true, maxAge });
      handleSuccess({
        ctx,
        result: { userInfo, token },
        msg: '登录成功',
      });
    } else {
      handleError({
        ctx,
        msg: '登录失败, 密码错误',
      });
    }
  } else {
    handleError({
      ctx,
      msg: '登录失败, 用户不存在',
    });
  }
};

exports.getUser = async ctx => {
  const data = verifyToken(getToken(ctx));
  if (!data) {
    handleError({
      ctx,
      msg: 'user token错误',
    });
  }

  const username = data.name;

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

  const result = await new User({ password: sha256(password), ...rest })
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

exports.updateConfig = async ctx => {
  const { username, password, ...rest } = ctx.request.body;

  if (password !== '') {
    rest.password = sha256(password);
  }

  const result = await User.findOneAndUpdate({ username }, rest).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '更新用户设置成功',
    fail: '更新用户设置失败',
  });
};

exports.checkRegisterable = async ctx => {
  const count = await User.count().catch(logError({ ctx }));

  handleResult({
    ctx,
    result: count < 1,
  });
};
