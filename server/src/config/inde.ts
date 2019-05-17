const path = require('path');
const convict = require('convict');
// const dotenv = require('dotenv');

// 必须要设置default字段
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  app: {
    name: {
      doc: "app name",
      format: String,
      default: "lijun's blog",
    },
    port: {
      doc: "The port to bind.",
      format: "port",
      default: null,
      env: "PORT",
      arg: "port"
    },
  },
  mongo: {
    uri: {
      doc: "mongodb uri",
      format: '*',
      default: 'server1.dev.test'
    }
  },
  author: {
    name: {
      doc: "author name",
      format: String,
      default: "lijun",
    },
    site: {
      doc: "author site",
      format: String,
      default: "lijun.space",
    },
    email: {
      doc: "author email",
      format: String,
      default: "ljunsky@foxmail.com",
    },
  },
  email: {
    host: {
      doc: "email host",
      format: String,
      default: "smtp.qq.com",
    },
    post: {
      doc: "email port",
      format: 'port',
      default: 465,
    },
    account: {
      doc: 'email account',
      format: String,
      default: null,
    },
    password: {
      doc: 'email password',
      format: String,
      default: null,
    },
  },
  token: {
    key: {
      doc: 'token key',
      format: String,
      default: null,
    },
    time: {
      doc: 'token expiration time',
      format: Number,
      default: 604800000,
    },
  }
});

// Load environment dependent configuration
// convict.addParser({ extension: 'env', parse: dotenv.parse });
const envPath = path.join(__dirname, './env.json');
config.loadFile(envPath);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
