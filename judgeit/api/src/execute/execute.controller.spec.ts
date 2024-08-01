import { Test, TestingModule } from '@nestjs/testing';
import { ExecuteController } from './execute.controller';
import { ExecuteService } from './execute.service';

describe('ExecuteController', () => {
  let controller: ExecuteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecuteController],
      providers: [ExecuteService],
    }).compile();

    controller = module.get<ExecuteController>(ExecuteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
