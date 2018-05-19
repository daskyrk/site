const mongoose = require('mongoose')

// to get a fully-fledged promise, see http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise

exports.mongoose = mongoose

exports.connect = dbConfig => {
  mongoose.connect(dbConfig.uris, dbConfig.options);

  mongoose.connection.on('error', (err) => {
    console.log('connect to mongodb occured error: ', err);
  })

  mongoose.connection.once('connected', () => {
    console.log('connect to mongodb success!');
  })

}
