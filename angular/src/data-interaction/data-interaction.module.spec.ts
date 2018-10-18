import { DataInteractionModule } from './data-interaction.module';

describe('DataInteractionModule', () => {
  let dataInteractionModule: DataInteractionModule;

  beforeEach(() => {
    dataInteractionModule = new DataInteractionModule();
  });

  it('should create an instance', () => {
    expect(dataInteractionModule).toBeTruthy();
  });
});
