import * as NamedSize from '../../src/NamedSize';

/** @test {NamedSize} */
describe('NamedSize', () => {
  const singleSize = [728, 90];
  const multiSize = [[728, 90], [970, 90]];

  /** @test {NamedSize#isNamedSize} */
  describe('#isNamedSize', () => {
    it('returns false for null', () => {
      expect(NamedSize.isNamedSize(null)).to.be(false);
    });

    it('returns false for undefined', () => {
      expect(NamedSize.isNamedSize(undefined)).to.be(false);
    });

    it('returns false for empty array', () => {
      expect(NamedSize.isNamedSize([])).to.be(false);
    });

    it('returns false for SingleSize', () => {
      expect(NamedSize.isNamedSize(singleSize)).to.be(false);
    });

    it('returns false for MultiSize', () => {
      expect(NamedSize.isNamedSize(multiSize)).to.be(false);
    });

    it('returns false for non-"fluid" string', () => {
      expect(NamedSize.isNamedSize('overflow')).to.be(false);
    });

    it('returns true for "fluid" string', () => {
      expect(NamedSize.isNamedSize('fluid')).to.be(true);
    });
  });
});
