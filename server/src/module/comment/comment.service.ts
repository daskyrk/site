import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDto } from './dto/comment.dto';
import { IComment } from './interface/comment.interface';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private readonly model: PaginateModel<IComment>) {}

  public async getAll() {
    return await this.model.find({});
  }

  public async getById(id: string) {
    return await this.model.findById(id);
  }

  public async create(data: CommentDto): Promise<IComment> {
    const createdCat = new this.model(data);
    return await createdCat.save();
  }

  public async update(data: CommentDto) {
    const res = await this.model.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    return res;
  }

  public async delete(id: string) {
    const res = await this.model.findByIdAndRemove(id);
    return res;
  }
}
