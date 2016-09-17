import SlotRenderEndedEvent from '../../../src/events/SlotRenderEndedEvent';

/** @test {SlotRenderEndedEvent} */
describe('SlotRenderEndedEvent', () => {
  const serviceName = 'testService';
  const slot = 'slot1';
  const creativeId = 12345;
  const lineItemId = 45673;
  const isEmpty = false;
  const size = [728, 90];

  function givenAnEvent() {
    return new SlotRenderEndedEvent(serviceName, slot, creativeId, lineItemId, isEmpty, size);
  }

  /** @test {SlotRenderEndedEvent#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const event = givenAnEvent();
      expect(event).to.be.ok();
    });
  });

  /** @test {SlotRenderEndedEvent#_name} */
  describe('#_name', () => {
    it('returns _name', () => {
      const event = givenAnEvent();
      expect(event._name).to.be('googletag.events.SlotRenderEndedEvent');
    });
  });

  /** @test {SlotRenderEndedEvent#serviceName} */
  describe('#serviceName', () => {
    it('returns serviceName', () => {
      const event = givenAnEvent();
      expect(event.serviceName).to.be(serviceName);
    });
  });

  /** @test {SlotRenderEndedEvent#slot} */
  describe('#slot', () => {
    it('returns slot', () => {
      const event = givenAnEvent();
      expect(event.slot).to.be(slot);
    });
  });

  /** @test {SlotRenderEndedEvent#creativeId} */
  describe('#creativeId', () => {
    it('returns creativeId', () => {
      const event = givenAnEvent();
      expect(event.creativeId).to.be(creativeId);
    });
  });

  /** @test {SlotRenderEndedEvent#isEmpty} */
  describe('#isEmpty', () => {
    it('returns isEmpty', () => {
      const event = givenAnEvent();
      expect(event.isEmpty).to.be(isEmpty);
    });
  });

  /** @test {SlotRenderEndedEvent#lineItemId} */
  describe('#lineItemId', () => {
    it('returns lineItemId', () => {
      const event = givenAnEvent();
      expect(event.lineItemId).to.be(lineItemId);
    });
  });

  /** @test {SlotRenderEndedEvent#size} */
  describe('#size', () => {
    it('returns size', () => {
      const event = givenAnEvent();
      expect(event.size).to.be(size);
    });
  });
});
