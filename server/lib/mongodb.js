const mongoose = require('mongoose');
// const log = require('./log');

// to get a fully-fledged promise, see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

// mongoose.Query.prototype.throw = function() {
//   return this.catch(err => {
//     log.error(err.message);
//     ctx.throw(500, '服务器内部错误');
//   });
// };

exports.mongoose = mongoose;

exports.connect = dbConfig => {
  mongoose.connect(dbConfig.uris, dbConfig.options);

  mongoose.connection.on('error', err => {
    console.log('connect to mongodb occured error: ', err);
  });

  mongoose.connection.once('connected', () => {
    console.log('connect to mongodb success!');
  });
};
