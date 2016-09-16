import Size from '../../src/Size';

describe('Size', () => {
  describe('#constructor', () => {
    it('constructs', () => {
      const size = new Size(728, 90);
      expect(size).to.be.ok();
      expect(size).to.have.property('w', 728);
      expect(size).to.have.property('h', 90);
    });
  });

  describe('#getWidth', () => {
    it('returns the width', () => {
      const size = new Size(300, 250);
      expect(size.getWidth()).to.be(300);
    });
  });

  describe('#getHeight', () => {
    it('returns the height', () => {
      const size = new Size(300, 600);
      expect(size.getHeight()).to.be(600);
    });
  });
});
