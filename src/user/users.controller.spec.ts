import { Test, TestingModule } from '@nestjs/testing';
import { UserIdentitiesController } from './users.controller';
import { UserIdentitiesService } from './users.service';

describe('UserIdentitiesController', () => {
  let controller: UserIdentitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserIdentitiesController],
      providers: [UserIdentitiesService],
    }).compile();

    controller = module.get<UserIdentitiesController>(UserIdentitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
