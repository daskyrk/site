// import * as JSONTransport from 'nodemailer/lib/json-transport';
// import * as SESTransport from 'nodemailer/lib/ses-transport';
// import * as SMTPPool from 'nodemailer/lib/smtp-pool';
// import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
// import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
// import * as StreamTransport from 'nodemailer/lib/stream-transport';

import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Type } from '@nestjs/common';

export interface MailerModuleOptions {
  // transport:
  //   | 'SMTPTransport'
  //   | 'SMTPPool'
  //   | 'SendmailTransport'
  //   | 'StreamTransport'
  //   | 'JSONTransport'
  //   | 'SESTransport'
  //   | 'Transport';
  host: string; // 邮箱smtp地址
  port: number; // 端口号
  auth: {
    user: string; // 邮箱账号
    pass: string; // 邮箱密码
  };
  secure?: boolean;
  secureConnection?: boolean;
  ignoreTLS: boolean;
  [key: string]: any;
}

export interface MailerOptionsFactory {
  createMailerOptions(): Promise<MailerModuleOptions> | MailerModuleOptions;
}
export interface MailerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  /**
   * 模块的名称
   */
  name?: string;
  /**
   * 应该用于提供MailerOptions的类
   */
  useClass?: Type<MailerOptionsFactory>;
  /**
   * 工厂应该用来提供MailerOptions
   */
  useFactory?: (...args: any[]) => Promise<MailerModuleOptions> | MailerModuleOptions;
  /**
   * 应该注入的提供者
   */
  inject?: any[];
}

// export { TransportOptions } from 'nodemailer';
// export interface SendmailTransportOptions extends SendmailTransport.Options {}
// export interface JSONTransportOptions extends JSONTransport.Options {}
// export interface SESTransportOptions extends SESTransport.Options {}
// export interface SMTPTransportOptions extends SMTPTransport.Options {}
// export interface SMTPPoolOptions extends SMTPPool.Options {}
// export interface StreamTransportOptions extends StreamTransport.Options {}
