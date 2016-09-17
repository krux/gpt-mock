import * as SizeMappingArray from '../../src/SizeMappingArray';

/** @test {SizeMappingArray} */
describe('SizeMappingArray', () => {
  const viewport1 = [1600, 1200];
  const viewport2 = [1050, 800];
  const single1 = [728, 90];
  const single2 = [970, 90];
  const multi = [single1, single2];

  /** @test {SizeMappingArray#isSizeMappingArray} */
  describe('#isSizeMappingArray', () => {
    it('returns false for null', () => {
      expect(SizeMappingArray.isSizeMappingArray(null)).to.be(false);
    });

    it('returns false for undefined', () => {
      expect(SizeMappingArray.isSizeMappingArray(undefined)).to.be(false);
    });

    it('returns false for "fluid"', () => {
      expect(SizeMappingArray.isSizeMappingArray('fluid')).to.be(false);
    });

    it('returns true for valid mapping', () => {
      expect(SizeMappingArray.isSizeMappingArray([
        [viewport1, multi],
        [viewport2, single2]
      ])).to.be(true);
    });

    it('returns false for invalid viewport', () => {
      expect(SizeMappingArray.isSizeMappingArray([
        [viewport1, multi],
        ['fluid', single2]
      ])).to.be(false);
    });
  });
});
