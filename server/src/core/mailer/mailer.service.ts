import * as Mail from 'nodemailer/lib/mailer';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { delay, retryWhen, scan, tap } from 'rxjs/operators';

import { MAILER_TOKEN } from './mailer.constants';

const logger = new Logger('MailerModule');

@Injectable()
export class MailerService {
  constructor(@Inject(MAILER_TOKEN) private readonly mailer: Mail) {}
  // 注册插件
  public use(
    name: string,
    pluginFunc: (...args: any[]) => any,
  ): ThisType<MailerService> {
    this.mailer.use(name, pluginFunc);
    return this;
  }

  // 设置配置
  public set(
    key: string,
    handler: (...args: any[]) => any,
  ): ThisType<MailerService> {
    this.mailer.set(key, handler);
    return this;
  }

  // 发送邮件配置
  public async send(mailMessage: Mail.Options): Promise<any> {
    return await from(this.mailer.sendMail(mailMessage))
      .pipe(
        handleRetry(),
        tap(() => {
          logger.log('send mail success');
          this.mailer.close();
        }),
      )
      .toPromise();
  }
}

export function handleRetry(
  retryAttempts = 5,
  retryDelay = 3000,
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount, error) => {
            const curCount = errorCount + 1;
            logger.error(
              `Unable to send email. Retrying (${curCount})...`,
            );
            if (curCount >= retryAttempts) {
              logger.error('send mail finally error', JSON.stringify(error));
              throw error;
            }
            return curCount;
          }, 0),
          delay(retryDelay),
        ),
      ),
    );
}
