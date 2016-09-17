import * as SizeMapping from '../../src/SizeMapping';

/** @test {SizeMapping} */
describe('SizeMapping', () => {
  const singlet = [1600];
  const triplet = [1600, 1200, 1];
  const viewport = [1600, 1200];
  const singleMappings = [768, 60];
  const multiMappings = [[768, 60], [970, 60]];

  /** @test {SizeMapping#isSizeMapping} */
  describe('#isSizeMapping', () => {
    it('returns false for null', () => {
      expect(SizeMapping.isSizeMapping(null)).to.be(false);
    });

    it('returns false for undefined', () => {
      expect(SizeMapping.isSizeMapping(undefined)).to.be(false);
    });

    it('returns false for singlet', () => {
      expect(SizeMapping.isSizeMapping(singlet)).to.be(false);
    });

    it('returns false for triplet', () => {
      expect(SizeMapping.isSizeMapping(triplet)).to.be(false);
    });

    it('returns true for good single mapping', () => {
      expect(SizeMapping.isSizeMapping([viewport, singleMappings])).to.be(true);
    });

    it('returns true for good multi mapping', () => {
      expect(SizeMapping.isSizeMapping([viewport, multiMappings])).to.be(true);
    });

    it('returns true for good fluid mapping', () => {
      expect(SizeMapping.isSizeMapping([viewport, 'fluid'])).to.be(true);
    });

    it('returns false for singlet mapping', () => {
      expect(SizeMapping.isSizeMapping([viewport, singlet])).to.be(false);
    });

    it('returns false for triplet mapping', () => {
      expect(SizeMapping.isSizeMapping([viewport, triplet])).to.be(false);
    });

    it('returns false for bad viewport', () => {
      expect(SizeMapping.isSizeMapping(['fluid', singleMappings])).to.be(false);
    });

    it('returns false for bad viewport multi', () => {
      expect(SizeMapping.isSizeMapping([multiMappings, singleMappings])).to.be(false);
    });
  });
});
