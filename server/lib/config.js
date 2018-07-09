const myConfig = require('./my-config');
module.exports = myConfig

// 以下为my-config文件内容示例
// exports.MONGODB = {
//   type: 'mongodb',
//   uris: 'mongodb://127.0.0.1:27017',
//   options: {},
// };

// exports.APP = {
//   port: 8000,
//   prefix: '/api',
//   LIMIT: 10,
// };

// exports.AUTH = {
//   secretKey: 'your secretKey',
// };

// exports.UPLOAD = {
//   accessKey: 'your accessKey',
//   secretKey: 'your secretKey',
//   bucket: 'bucket name',
//   origin: 'http://blog.u.qiniudn.com',
//   uploadURL: 'http://up.qiniu.com/',
//   // timeout: 3600000, // default rpc timeout: one hour, optional
// };
