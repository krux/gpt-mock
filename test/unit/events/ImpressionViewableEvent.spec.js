import ImpressionViewableEvent from '../../../src/events/ImpressionViewableEvent';

/** @test {ImpressionViewableEvent} */
describe('ImpressionViewableEvent', () => {
  const serviceName = 'testService';
  const slot = 'slot1';

  /** @test {ImpressionViewableEvent#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const event = new ImpressionViewableEvent(serviceName, slot);
      expect(event).to.be.ok();
    });
  });

  /** @test {ImpressionViewableEvent#_name} */
  describe('#_name', () => {
    it('returns name', () => {
      const event = new ImpressionViewableEvent(serviceName, slot);
      expect(event._name).to.be('googletag.events.ImpressionViewableEvent');
    });
  });

  /** @test {ImpressionViewableEvent#serviceName} */
  describe('#serviceName', () => {
    it('returns serviceName', () => {
      const event = new ImpressionViewableEvent(serviceName, slot);
      expect(event.serviceName).to.be(serviceName);
    });
  });

  /** @test {ImpressionViewableEvent#slot} */
  describe('#slot', () => {
    it('returns slot', () => {
      const event = new ImpressionViewableEvent(serviceName, slot);
      expect(event.slot).to.be(slot);
    });
  });
});
