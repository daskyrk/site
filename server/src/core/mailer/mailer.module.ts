import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  MailerModuleAsyncOptions,
  MailerModuleOptions,
  MailerOptionsFactory,
} from './mailer-options.interface';

import { MAILER_MODULE_OPTIONS } from './mailer.constants';
import { MailerService } from './mailer.service';
import { createMailerProviders } from './mailer.provider';

@Module({})
export class MailerModule {
  /**
   * 根据给定的模块选项返回异步Provider
   * @param options 邮箱模块的选项
   */
  private static createAsyncProviders(
    options: MailerModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }
    return [];
  }

  /**
   * 根据给定的模块选项返回异步邮箱选项Provider
   * @param options 邮箱模块的选项
   */
  private static createAsyncOptionsProvider(
    options: MailerModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MAILER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: MAILER_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MailerOptionsFactory) =>
        await optionsFactory.createMailerOptions(),
      inject: [options.useClass],
    };
  }
  /**
   * 同步初始化邮箱模块
   * @param options 邮箱模块的选项
   */
  public static forRoot(options: MailerModuleOptions): DynamicModule {
    return {
      module: MailerModule,
      providers: [
        { provide: MAILER_MODULE_OPTIONS, useValue: options },
        createMailerProviders(),
        MailerService,
      ],
      exports: [MailerService],
    };
  }

  /**
   * 异步初始化邮箱模块
   * @param options 邮箱模块的选项
   */
  public static forRootAsync(
    options: MailerModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: MailerModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        createMailerProviders<MailerModuleOptions>(),
        MailerService,
      ],
      exports: [MailerService],
    };
  }

  public async onModuleDestroy() {
    // TODO: close connection
  }
}
