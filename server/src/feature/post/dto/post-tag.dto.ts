import { IsNotEmpty, IsString } from 'class-validator';

export class PostTagDto {
  public id: string;

  @IsNotEmpty()
  @IsString()
  public postId: string;

  @IsNotEmpty()
  @IsString()
  public tagId: string;
}
