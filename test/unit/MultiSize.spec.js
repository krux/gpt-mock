import * as MultiSize from '../../src/MultiSize';
import Size from '../../src/Size';

/** @test {MultiSize} */
describe('MultiSize', () => {
  const singleSize = [728, 90];
  const multiSize = [[728, 90], [970, 90]];

  /** @test {MultiSize#isMultiSize} */
  describe('#isMultiSize', () => {
    it('returns false for null', () => {
      expect(MultiSize.isMultiSize(null)).to.be(false);
    });

    it('returns false for undefined', () => {
      expect(MultiSize.isMultiSize(undefined)).to.be(false);
    });

    it('returns true for empty array', () => {
      expect(MultiSize.isMultiSize([])).to.be(true);
    });

    it('returns false for SingleSize', () => {
      expect(MultiSize.isMultiSize(singleSize)).to.be(false);
    });

    it('returns true for MultiSize', () => {
      expect(MultiSize.isMultiSize(multiSize)).to.be(true);
    });
  });

  /** @test {MultiSize#toSizes} */
  describe('#toSizes', () => {
    it('returns empty array for null', () => {
      const result = MultiSize.toSizes(null);
      expect(result).to.be.an('array');
      expect(result).to.be.empty();
    });

    it('returns empty array for object', () => {
      const result = MultiSize.toSizes({});
      expect(result).to.be.an('array');
      expect(result).to.be.empty();
    });

    it('returns empty array for SingleSize', () => {
      const result = MultiSize.toSizes(singleSize);
      expect(result).to.be.an('array');
      expect(result).to.be.empty();
    });

    it('returns array of sizes for MultiSize', () => {
      const result = MultiSize.toSizes(multiSize);
      expect(result).to.be.an('array');
      expect(result).to.be.eql([
        new Size(728, 90),
        new Size(970, 90)
      ]);
    });
  });
});
