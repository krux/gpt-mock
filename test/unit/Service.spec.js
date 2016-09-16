import Service from '../../src/Service';
import GPT from '../../src/GPT';
import Slot from '../../src/Slot';

describe('Service', () => {
  const gt = new GPT();
  const name = 'something';
  const adUnitPath = '/Test/123';
  const size = [728, 90];
  const eventType = 'some.event';

  describe('#constructor', () => {
    it('constructs', () => {
      const service = new Service(gt, name);
      expect(service).to.be.ok();
      expect(service).to.have.property('_gt', gt);
      expect(service).to.have.property('_name', name);
    });
  });

  describe('#getName', () => {
    it('returns the name', () => {
      const service = new Service(gt, name);
      expect(service.getName()).to.be(name);
    });
  });

  describe('#getVersion', () => {
    it('returns "unversioned"', () => {
      const service = new Service(gt, name);
      expect(service.getVersion()).to.be('unversioned');
    });
  });

  describe('#getSlots', () => {
    it('returns empty array if no slots', () => {
      const service = new Service(gt, name);
      expect(service.getSlots()).to.be.an('array');
      expect(service.getSlots()).to.be.empty();
    });

    it('return array of slots where this service is enabled', () => {
      const service = new Service(gt, name);
      const slot1 = new Slot(adUnitPath, size).addService(service);
      const slot2 = new Slot(adUnitPath, size).addService(service);
      expect(service.getSlots()).to.be.an('array');
      expect(service.getSlots()).to.eql([slot1, slot2]);
    });
  });

  describe('#getSlotIdMap', () => {
    it('returns empty dictionary if no slots', () => {
      const service = new Service(gt, name);
      expect(service.getSlotIdMap()).to.be.empty();
    });

    it('returns dictionary mapping keys to slots', () => {
      const service = new Service(gt, name);
      const slot1 = new Slot(adUnitPath, size).addService(service);
      const slot2 = new Slot(adUnitPath, size).addService(service);
      expect(service.getSlotIdMap()).to.be.an('object');
      expect(service.getSlotIdMap()).to.be.eql({
        [`${adUnitPath}_1`]: slot1,
        [`${adUnitPath}_2`]: slot2
      });
    });
  });

  describe('#addEventListener', () => {
    it('returns the service', () => {
      const service = new Service(gt, name);
      const fn = sinon.spy();
      expect(service.addEventListener(eventType, fn)).to.be(service);
    });

    it('adds the listener to event listener map', () => {
      const service = new Service(gt, name);
      const fn = sinon.spy();
      service.addEventListener(eventType, fn);
      expect(service).to.have.property('_listeners');
      expect(service._listeners).to.be.an('object');
      expect(service._listeners).to.have.property(eventType);
      expect(service._listeners[eventType]).to.be.an('array');
      expect(service._listeners[eventType]).to.contain(fn);
    });
  });

  describe('#get', () => {
    it('returns empty map if no attribute', () => {
      const service = new Service(gt, name);
      expect(service.get('attr1')).to.be(null);
    });

    it('attribute value if set', () => {
      const service = new Service(gt, name);
      service.set('attr1', 'value1');
      expect(service.get('attr1')).to.be('value1');
    });
  });

  describe('#getAttributeKeys', () => {
    it('returns empty array if no attributes', () => {
      const service = new Service(gt, name);
      expect(service.getAttributeKeys()).to.be.an('array');
      expect(service.getAttributeKeys()).to.be.empty();
    });

    it('returns array with with attribute keys', () => {
      const service = new Service(gt, name);
      service.set('attr1', 'value1');
      service.set('attr2', 'value2');
      expect(service.getAttributeKeys()).to.be.an('array');
      expect(service.getAttributeKeys()).to.be.eql(['attr1', 'attr2']);
    });
  });

  describe('#set', () => {
    it('returns the service', () => {
      const service = new Service(gt, name);
      expect(service.set('attr1', 'value1')).to.be(service);
    });

    it('save the attribute value', () => {
      const service = new Service(gt, name);
      service.set('attr1', 'value1');
      expect(service.get('attr1')).to.be('value1');
    });
  });

  describe('#display', () => {
    it('returns undefined', () => {
      const service = new Service(gt, name);
      expect(service.display(adUnitPath, size)).to.be(undefined);
    });

    it('marks the service as used', () => {
      const service = new Service(gt, name);
      service.display(adUnitPath, size);
      expect(service._used).to.be(true);
    });

    it('enables the service', () => {
      const service = new Service(gt, name);
      service.display(adUnitPath, size);
      expect(service._enabled).to.be(true);
    });

    it('adds a slot', () => {
      const service = new Service(gt, name);
      service.display(adUnitPath, size);
      expect(service._slots).to.be.an('array');
      expect(service._slots[0].getAdUnitPath()).to.be(adUnitPath);
    });
  });

  describe('#enable', () => {
    it('set enabled flag', () => {
      const service = new Service(gt, name);
      service.enable();
      expect(service._enabled).to.be(true);
    });

    it('call _onEnable', sinon.test(function() {
      const service = new Service(gt, name);
      const mock = this.mock(service);
      mock.expects('_onEnable').once();

      new Slot(adUnitPath, size).addService(service);
      service.enable();
      expect(service._enabled).to.be(true);
    }));
  });

});
