import { IocModule } from './ioc.module';

describe('IocModule', () => {
  let iocModule: IocModule;

  beforeEach(() => {
    iocModule = new IocModule();
  });

  it('should create an instance', () => {
    expect(iocModule).toBeTruthy();
  });
});
