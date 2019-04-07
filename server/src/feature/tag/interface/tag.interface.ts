import { BaseInterface } from '@/shared/base/base.interface';
import { TagDto } from '../dto/tag.dto';

export interface ITag extends TagDto, BaseInterface {
  _id: string;
}
