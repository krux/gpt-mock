import SlotId from '../../src/SlotId';

/** @test {SlotId} */
describe('SlotId', () => {
  const adUnitPath = '/Test/12345';
  const instance = 123;
  const optDomId = 'gpt-div-123';

  /** @test {SlotId#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const slotId = new SlotId(adUnitPath, instance, optDomId);
      expect(slotId).to.be.ok();
      expect(slotId).to.have.property('_adUnitPath', adUnitPath);
      expect(slotId).to.have.property('_instance', instance);
      expect(slotId).to.have.property('_domId', optDomId);
    });

    it('generates a dom ID if required', () => {
      const slotId = new SlotId(adUnitPath, instance);
      expect(slotId).to.be.ok();
      expect(slotId).to.have.property('_adUnitPath', adUnitPath);
      expect(slotId).to.have.property('_instance', instance);
      expect(slotId).to.have.property('_domId', 'gpt_unit_/Test/12345_123');
    });
  });

  /** @test {SlotId#getId} */
  describe('#getId', () => {
    it('returns the identifier', () => {
      const slotId = new SlotId(adUnitPath, instance, optDomId);
      expect(slotId.getId()).to.be(`${adUnitPath}_${instance}`);
    });
  });

  /** @test {SlotId#getInstance} */
  describe('#getInstance', () => {
    it('returns the instance', () => {
      const slotId = new SlotId(adUnitPath, instance, optDomId);
      expect(slotId.getInstance()).to.be(instance);
    });
  });

  /** @test {SlotId#getName} */
  describe('#getName', () => {
    it('returns the AdUnitPath', () => {
      const slotId = new SlotId(adUnitPath, instance, optDomId);
      expect(slotId.getName()).to.be(adUnitPath);
    });
  });

  /** @test {SlotId#getAdUnitPath} */
  describe('#getAdUnitPath', () => {
    it('returns the AdUnitPath', () => {
      const slotId = new SlotId(adUnitPath, instance, optDomId);
      expect(slotId.getAdUnitPath()).to.be(adUnitPath);
    });
  });

  /** @test {SlotId#getDomId} */
  describe('#getDomId', () => {
    it('returns the DOM ID passed in', () => {
      const slotId = new SlotId(adUnitPath, instance, optDomId);
      expect(slotId.getDomId()).to.be(optDomId);
    });

    it('returns the generated DOM ID', () => {
      const slotId = new SlotId(adUnitPath, instance);
      expect(slotId.getDomId()).to.be('gpt_unit_/Test/12345_123');
    });
  });

  /** @test {SlotId#toString} */
  describe('#toString', () => {
    it('returns the identifier', () => {
      const slotId = new SlotId(adUnitPath, instance, optDomId);
      expect(slotId.toString()).to.be(`${adUnitPath}_${instance}`);
    });
  });
});
