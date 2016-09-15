import GoogleTag from '../../src/GoogleTag';

describe('GoogleTag', () => {
  describe('#constructor', () => {
    it('constructs', () => {
      const googletag = new GoogleTag();
      expect(googletag).to.be.ok();
    });
  });
});
