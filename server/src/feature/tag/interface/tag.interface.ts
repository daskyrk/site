import { BaseInterface } from '@/shared/base/base.interface';
import { TagDto } from '../dto/tag.dto';
import { PostTagDto } from '../../post/dto/post-tag.dto';

export interface ITag extends TagDto, BaseInterface {
}
