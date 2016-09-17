import SlotVisibilityChangedEvent from '../../../src/events/SlotVisibilityChangedEvent';

/** @test {SlotVisibilityChangedEvent} */
describe('SlotVisibilityChangedEvent', () => {
  const serviceName = 'testService';
  const slot = 'slot1';
  const inViewPercentage = 85;

  /** @test {SlotVisibilityChangedEvent#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const event = new SlotVisibilityChangedEvent(serviceName, slot, inViewPercentage);
      expect(event).to.be.ok();
    });
  });

  /** @test {SlotVisibilityChangedEvent#_name} */
  describe('#_name', () => {
    it('returns _name', () => {
      const event = new SlotVisibilityChangedEvent(serviceName, slot, inViewPercentage);
      expect(event._name).to.be('googletag.events.SlotVisibilityChangedEvent');
    });
  });

  /** @test {SlotVisibilityChangedEvent#serviceName} */
  describe('#serviceName', () => {
    it('returns serviceName', () => {
      const event = new SlotVisibilityChangedEvent(serviceName, slot, inViewPercentage);
      expect(event.serviceName).to.be(serviceName);
    });
  });

  /** @test {SlotVisibilityChangedEvent#slot} */
  describe('#slot', () => {
    it('returns slot', () => {
      const event = new SlotVisibilityChangedEvent(serviceName, slot, inViewPercentage);
      expect(event.slot).to.be(slot);
    });
  });

  /** @test {SlotVisibilityChangedEvent#inViewPercentage} */
  describe('#inViewPercentage', () => {
    it('returns inViewPercentage', () => {
      const event = new SlotVisibilityChangedEvent(serviceName, slot, inViewPercentage);
      expect(event.inViewPercentage).to.be(inViewPercentage);
    });
  });
});
