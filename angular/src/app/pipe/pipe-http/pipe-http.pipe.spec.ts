import { PipeHttpPipe } from './pipe-http.pipe';

describe('PipeHttpPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeHttpPipe();
    expect(pipe).toBeTruthy();
  });
});
