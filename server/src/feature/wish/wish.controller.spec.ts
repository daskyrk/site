import { Test, TestingModule } from '@nestjs/testing';
import { WishController } from './wish.controller';

describe('Wish Controller', () => {
  let controller: WishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishController],
    }).compile();

    controller = module.get<WishController>(WishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
