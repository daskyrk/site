import Joi from 'joi';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(path.join(__dirname, filePath)));
    const envConfig = this.validateInput(config);
    this.envConfig = envConfig;
    // tslint:disable-next-line:forin
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      APP_NAME: Joi.string(),
      APP_PORT: Joi.number().default(8000),
      APP_LIMIT: Joi.number().default(10),
      API_PREFIX: Joi.string().default('/'),
      MONGO_URI: Joi.string().required(),
      AUTHOR: Joi.string(),
      AUTHOR_SITE: Joi.string(),
      AUTHOR_MAIL: Joi.string(),
      EMAIL_HOST: Joi.string(),
      EMAIL_PORT: Joi.number(),
      EMAIL_ACCOUNT: Joi.string(),
      EMAIL_PASSWORD: Joi.string(),
      TOKEN_KEY: Joi.string(),
      TOKEN_TIME: Joi.number(),
      NETEASE_PHONE: Joi.string(),
      NETEASE_PWD: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  public get APP_NAME() {
    return this.envConfig.APP_NAME;
  }

  public get APP_PORT() {
    return this.envConfig.APP_PORT;
  }

  public get APP_LIMIT() {
    return this.envConfig.APP_LIMIT;
  }

  public get API_PREFIX() {
    return this.envConfig.API_PREFIX;
  }

  public get MONGO_URI() {
    return this.envConfig.MONGO_URI;
  }

  public get AUTHOR() {
    return this.envConfig.AUTHOR;
  }

  public get AUTHOR_SITE() {
    return this.envConfig.AUTHOR_SITE;
  }

  public get AUTHOR_MAIL() {
    return this.envConfig.AUTHOR_MAIL;
  }

  public get EMAIL_HOST() {
    return this.envConfig.EMAIL_HOST;
  }

  public get EMAIL_PORT() {
    return this.envConfig.EMAIL_PORT;
  }

  public get EMAIL_ACCOUNT() {
    return this.envConfig.EMAIL_ACCOUNT;
  }

  public get EMAIL_PASSWORD() {
    return this.envConfig.EMAIL_PASSWORD;
  }

  public get TOKEN_KEY() {
    return this.envConfig.TOKEN_KEY;
  }

  public get TOKEN_TIME() {
    return this.envConfig.TOKEN_TIME;
  }

  public get NETEASE_PHONE() {
    return this.envConfig.NETEASE_PHONE;
  }

  public get NETEASE_PWD() {
    return this.envConfig.NETEASE_PWD;
  }

  public get APP_INFO() {
    return {
      name: this.envConfig.APP_NAME,
      port: this.envConfig.APP_PORT,
    };
  }

  public get AUTHOR_INFO() {
    return {
      site: this.envConfig.AUTHOR_SITE,
      mail: this.envConfig.AUTHOR_MAIL,
    };
  }

  public get EMAIL_INFO() {
    return {
      host: this.envConfig.EMAIL_HOST,
      port: this.envConfig.EMAIL_PORT,
      account: this.envConfig.EMAIL_ACCOUNT,
      password: this.envConfig.EMAIL_PASSWORD,
    };
  }

  public get isDev(): boolean {
    return this.envConfig.NODE_ENV === 'development';
  }

  public get isProd(): boolean {
    return this.envConfig.NODE_ENV === 'production';
  }
}

export default new ConfigService('.env');
