import SlotOnloadEvent from '../../../src/events/SlotOnloadEvent';

/** @test {SlotOnloadEvent} */
describe('SlotOnloadEvent', () => {
  const serviceName = 'testService';
  const slot = 'slot1';

  /** @test {SlotOnloadEvent#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const event = new SlotOnloadEvent(serviceName, slot);
      expect(event).to.be.ok();
    });
  });

  /** @test {SlotOnloadEvent#_name} */
  describe('#_name', () => {
    it('returns _name', () => {
      const event = new SlotOnloadEvent(serviceName, slot);
      expect(event._name).to.be('googletag.events.SlotOnloadEvent');
    });
  });

  /** @test {SlotOnloadEvent#serviceName} */
  describe('#serviceName', () => {
    it('returns serviceName', () => {
      const event = new SlotOnloadEvent(serviceName, slot);
      expect(event.serviceName).to.be(serviceName);
    });
  });

  /** @test {SlotOnloadEvent#slot} */
  describe('#slot', () => {
    it('returns slot', () => {
      const event = new SlotOnloadEvent(serviceName, slot);
      expect(event.slot).to.be(slot);
    });
  });
});
