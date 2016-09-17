import * as SingleSize from '../../src/SingleSize';
import Size from '../../src/Size';

/** @test {SingleSize} */
describe('SingleSize', () => {
  const singleSize = [728, 90];
  const multiSize = [[728, 90], [970, 90]];

  /** @test {SingleSize#isSingleSize} */
  describe('#isSingleSize', () => {
    it('returns false for null', () => {
      expect(SingleSize.isSingleSize(null)).to.be(false);
    });

    it('returns false for undefined', () => {
      expect(SingleSize.isSingleSize(undefined)).to.be(false);
    });

    it('returns false for empty array', () => {
      expect(SingleSize.isSingleSize([])).to.be(false);
    });

    it('returns true for SingleSize', () => {
      expect(SingleSize.isSingleSize(singleSize)).to.be(true);
    });

    it('returns false for MultiSize', () => {
      expect(SingleSize.isSingleSize(multiSize)).to.be(false);
    });

    it('returns false for non-"fluid" string', () => {
      expect(SingleSize.isSingleSize('overflow')).to.be(false);
    });

    it('returns true for "fluid" string', () => {
      expect(SingleSize.isSingleSize('fluid')).to.be(true);
    });
  });

  /** @test {SingleSize#toSize} */
  describe('#toSize', () => {
    it('returns null for null', () => {
      expect(SingleSize.toSize(null)).to.be(null);
    });

    it('returns null for undefined', () => {
      expect(SingleSize.toSize(undefined)).to.be(null);
    });

    it('returns null for empty array', () => {
      expect(SingleSize.toSize([])).to.be(null);
    });

    it('returns Size for SingleSize', () => {
      expect(SingleSize.toSize(singleSize)).to.eql(new Size(728, 90));
    });

    it('returns null for MultiSize', () => {
      expect(SingleSize.toSize(multiSize)).to.be(null);
    });

    it('returns null for non-"fluid" string', () => {
      expect(SingleSize.toSize('overflow')).to.be(null);
    });

    xit('returns UNKNOWN for "fluid" string', () => {
      expect(SingleSize.toSize('fluid')).to.be(true);
    });
  });
});
