import GPT from '../../src/GPT';

/*
 * When filing a bug issue, add a failing unit test like the one below.
 *
 * Note this particular test passes now.
 */
describe('bugs', () => {
  // replace 1 with the issue number and 'how to file bug' with a short
  // description of the problem
  describe('issue 1: how to file bug', () => {
    // replace 'should set apiReady when loaded' with a short description of
    // the expected behaviour
    it('should set apiReady when loaded', () => {
      const gpt = new GPT();

      // Replace this code with steps to reproduce the problem
      expect(gpt.apiReady).to.be(undefined);
      gpt._loaded();
      expect(gpt.apiReady).to.be(true);
    });
  });
});
