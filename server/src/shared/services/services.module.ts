import { MailService } from './mail.services';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    providers: [MailService],
    exports: [MailService],
})
export class ServicesModule { }
