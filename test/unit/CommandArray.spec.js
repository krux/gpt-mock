import CommandArray from '../../src/CommandArray';

describe('CommandArray', () => {
  describe('#constructor', () => {
    it('constructs with empty array', () => {
      const cmd = new CommandArray([]);
      expect(cmd).to.be.ok();
    });

    it('constructs with calls commands', () => {
      const fn1 = sinon.spy();
      const fn2 = sinon.spy();
      const cmd = new CommandArray([fn1, fn2]);
      expect(cmd).to.be.ok();
      expect(cmd).to.have.property('_count', 2);
      expect(fn1.calledOnce).to.be(true);
      expect(fn2.calledOnce).to.be(true);
    });
  });

  describe('#push', () => {
    it('executes the function and updates the count', () => {
      const cmd = new CommandArray([]);
      const fn = sinon.spy();

      const result = cmd.push(fn);
      expect(result).to.be(1);
      expect(fn.calledOnce).to.be(true);
    });

    it('continues updating count after constructor', () => {
      const fn1 = sinon.spy();
      const fn2 = sinon.spy();
      const fn3 = sinon.spy();
      const cmd = new CommandArray([fn1, fn2]);
      expect(cmd).to.be.ok();
      expect(cmd).to.have.property('_count', 2);

      const result = cmd.push(fn3);
      expect(result).to.be(3);
      expect(cmd).to.have.property('_count', 3);

      expect(fn1.calledOnce).to.be(true);
      expect(fn2.calledOnce).to.be(true);
      expect(fn3.calledOnce).to.be(true);
    });
  });
});
