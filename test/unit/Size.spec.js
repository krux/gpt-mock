import Size from '../../src/Size';

/** @test {Size} */
describe('Size', () => {
  /** @test {Size#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const size = new Size(728, 90);
      expect(size).to.be.ok();
      expect(size).to.have.property('width', 728);
      expect(size).to.have.property('height', 90);
    });
  });

  /** @test {Size#getWidth} */
  describe('#getWidth', () => {
    it('returns the width', () => {
      const size = new Size(300, 250);
      expect(size.getWidth()).to.be(300);
    });
  });

  /** @test {Size#getHeight} */
  describe('#getHeight', () => {
    it('returns the height', () => {
      const size = new Size(300, 600);
      expect(size.getHeight()).to.be(600);
    });
  });

  /** @test {Size#isEmpty} */
  describe('#isEmpty', () => {
    it('returns false for a non-empty Size', () => {
      const size = new Size(300, 600);
      expect(size.isEmpty()).to.be(false);
    });

    it('returns true for an empty Size', () => {
      const size = new Size(0, 0);
      expect(size.isEmpty()).to.be(true);
    });
  });

  /** @test {Size#ceil} */
  describe('#ceil', () => {
    it('truncates upward', () => {
      const size = new Size(299.999999, 599.99999);
      expect(size.ceil()).to.eql(new Size(300, 600));
    });
  });

  /** @test {Size#floor} */
  describe('#floor', () => {
    it('truncates downward', () => {
      const size = new Size(300.000000001, 600.0000001);
      expect(size.floor()).to.eql(new Size(300, 600));
    });
  });

  /** @test {Size#round} */
  describe('#round', () => {
    it('rounds the size downward', () => {
      const size = new Size(300.000000001, 600.0000001);
      expect(size.round()).to.eql(new Size(300, 600));
    });

    it('rounds the size upward', () => {
      const size = new Size(299.999999, 599.99999);
      expect(size.round()).to.eql(new Size(300, 600));
    });
  });
});
