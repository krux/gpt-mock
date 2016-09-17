import * as SingleSizeArray from '../../src/SingleSizeArray';
import Size from '../../src/Size';

/** @test {SingleSizeArray} */
describe('SingleSizeArray', () => {
  const singleSize = [728, 90];
  const triplet = [728, 90, 200];
  const singlet = [728];
  const multiSize = [[728, 90], [970, 90]];

  /** @test {SingleSizeArray#isSingleSize} */
  describe('#isSingleSize', () => {
    it('returns false for null', () => {
      expect(SingleSizeArray.isSingleSizeArray(null)).to.be(false);
    });

    it('returns false for undefined', () => {
      expect(SingleSizeArray.isSingleSizeArray(undefined)).to.be(false);
    });

    it('returns false for empty array', () => {
      expect(SingleSizeArray.isSingleSizeArray([])).to.be(false);
    });

    it('returns true for SingleSize', () => {
      expect(SingleSizeArray.isSingleSizeArray(singleSize)).to.be(true);
    });

    it('returns false for a triple', () => {
      expect(SingleSizeArray.isSingleSizeArray(triplet)).to.be(false);
    });

    it('returns false for a single', () => {
      expect(SingleSizeArray.isSingleSizeArray(singlet)).to.be(false);
    });

    it('returns false for MultiSize', () => {
      expect(SingleSizeArray.isSingleSizeArray(multiSize)).to.be(false);
    });

    it('returns false for non-"fluid" string', () => {
      expect(SingleSizeArray.isSingleSizeArray('overflow')).to.be(false);
    });

    it('returns false for "fluid" string', () => {
      expect(SingleSizeArray.isSingleSizeArray('fluid')).to.be(false);
    });
  });

  /** @test {SingleSizeArray#toSize} */
  describe('#toSize', () => {
    it('returns null for null', () => {
      expect(SingleSizeArray.toSize(null)).to.be(null);
    });

    it('returns null for undefined', () => {
      expect(SingleSizeArray.toSize(undefined)).to.be(null);
    });

    it('returns null for empty array', () => {
      expect(SingleSizeArray.toSize([])).to.be(null);
    });

    it('returns Size for SingleSize', () => {
      expect(SingleSizeArray.toSize(singleSize)).to.eql(new Size(728, 90));
    });

    it('returns null for a triple', () => {
      expect(SingleSizeArray.toSize(triplet)).to.be(null);
    });

    it('returns null for a single', () => {
      expect(SingleSizeArray.toSize(singlet)).to.be(null);
    });

    it('returns null for MultiSize', () => {
      expect(SingleSizeArray.toSize(multiSize)).to.be(null);
    });

    it('returns null for non-"fluid" string', () => {
      expect(SingleSizeArray.toSize('overflow')).to.be(null);
    });

    xit('returns null for "fluid" string', () => {
      expect(SingleSizeArray.toSize('fluid')).to.be(null);
    });
  });
});
