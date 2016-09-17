import * as GeneralSize from '../../src/GeneralSize';
import Size from '../../src/Size';

/** @test {GeneralSize} */
describe('GeneralSize', () => {
  const triplet = [728, 90, 1];
  const singleSize = [728, 90];
  const multiSize = [[728, 90], [970, 90]];

  /** @test {GeneralSize#isGeneralSize} */
  describe('#isGeneralSize', () => {
    it('returns false for null', () => {
      expect(GeneralSize.isGeneralSize(null)).to.be(false);
    });

    it('returns false for undefined', () => {
      expect(GeneralSize.isGeneralSize(undefined)).to.be(false);
    });

    it('returns true for empty array', () => {
      expect(GeneralSize.isGeneralSize([])).to.be(true);
    });

    it('returns true for SingleSize', () => {
      expect(GeneralSize.isGeneralSize(singleSize)).to.be(true);
    });

    it('returns true for MultiSize', () => {
      expect(GeneralSize.isGeneralSize(multiSize)).to.be(true);
    });
  });

  /** @test {GeneralSize#toSizes} */
  describe('#toSizes', () => {
    it('returns empty array for null', () => {
      const result = GeneralSize.toSizes(null);
      expect(result).to.be.an('array');
      expect(result).to.be.empty();
    });

    it('returns empty array for empty array', () => {
      const result = GeneralSize.toSizes([]);
      expect(result).to.be.an('array');
      expect(result).to.be.empty();
    });

    it('returns empty array for triplet', () => {
      const result = GeneralSize.toSizes(triplet);
      expect(result).to.be.an('array');
      expect(result).to.be.empty();
    });

    it('returns array of sizes for SingleSize', () => {
      const result = GeneralSize.toSizes(singleSize);
      expect(result).to.be.an('array');
      expect(result).to.be.eql([
        new Size(728, 90)
      ]);
    });

    it('returns array of sizes for MultiSize', () => {
      const result = GeneralSize.toSizes(multiSize);
      expect(result).to.be.an('array');
      expect(result).to.be.eql([
        new Size(728, 90),
        new Size(970, 90)
      ]);
    });
  });
});
