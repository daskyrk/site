import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

const logger = new Logger();

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  public async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype, type, data } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errMsg = errors.reduce((msg, err) => msg+=Object.values(err.constraints).join(', '), '');
      logger.error(errMsg);
      throw new BadRequestException('Validation failed', errMsg);
    }
    return value;
  }
}
