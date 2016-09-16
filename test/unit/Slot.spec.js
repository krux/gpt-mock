import GPT from '../../src/GPT';
import Slot from '../../src/Slot';
import Service from '../../src/Service';
import ResponseInformation from '../../src/ResponseInformation';
import SafeFrameConfig from '../../src/SafeFrameConfig';

describe('Slot', () => {
  const adUnitPath = '';
  const optDiv = null;
  const size = [728, 90];
  const gt = new GPT();
  const clickUrl = 'http://www.google.com/';

  describe('#constructor', () => {
    it('constructs', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot).to.be.ok();
    });
  });

  describe('#getAdUnitPath', () => {
    it('returns the adUnitPath', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getAdUnitPath()).to.be(adUnitPath);
    });
  });

  describe('#getSlotElementId', () => {
    it('returns the optDiv', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getSlotElementId()).to.be(optDiv);
    });
  });

  describe('#getServices', () => {
    it('returns the services', () => {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      expect(slot.getServices()).to.be.an('array');
      expect(slot.getServices()).to.be.eql([service]);
    });
  });

  describe('#getSizes', () => {
    it('returns the sizes', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getSizes()).to.be.an('array');
      expect(slot.getSizes()).to.have.length(1);
      const [size1] = slot.getSizes();
      expect(size1).to.be.ok();
      expect(size1.getWidth()).to.be(size[0]);
      expect(size1.getHeight()).to.be(size[1]);
    });
  });

  describe('#getOutOfPage', () => {
    it('returns the outOfPage status', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getOutOfPage()).to.be.a('boolean');
      expect(slot.getOutOfPage()).to.be(false);
      slot._options.outOfPage = true;
      expect(slot.getOutOfPage()).to.be(true);
    });
  });

  describe('#display', () => {
    it('returns undefined', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.display()).to.be(undefined);
    });

    it('marks the slot as displayed', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.display();
      expect(slot._options.displayed).to.be(true);
    });

    it('fires event listeners', () => {
      const service = new Service(gt, 'test');
      const onImpressionViewableEvent = sinon.spy();
      const onSlotOnloadEvent = sinon.spy();
      const onSlotRenderEndedEvent = sinon.spy();
      const onSlotVisibilityChangedEvent = sinon.spy();

      service.addEventListener('googletag.events.ImpressionViewableEvent',
        onImpressionViewableEvent);
      service.addEventListener('googletag.events.SlotOnloadEvent',
        onSlotOnloadEvent);
      service.addEventListener('googletag.events.SlotRenderEndedEvent',
        onSlotRenderEndedEvent);
      service.addEventListener('googletag.events.SlotVisibilityChangedEvent',
        onSlotVisibilityChangedEvent);

      const slot = new Slot(adUnitPath, size, optDiv).addService(service);

      slot.display();
      expect(onImpressionViewableEvent.calledOnce).to.be(true);
      expect(onSlotOnloadEvent.calledOnce).to.be(true);
      expect(onSlotRenderEndedEvent.calledOnce).to.be(true);
      expect(onSlotVisibilityChangedEvent.calledOnce).to.be(true);
    });
  });

  describe('#getAttributeKeys', () => {
    it('returns the attribute keys', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getAttributeKeys()).to.be.an('array');
      expect(slot.getAttributeKeys()).to.be.empty();
      slot.set('attr1', 'value1');
      expect(slot.getAttributeKeys()).to.not.be.empty();
      expect(slot.getAttributeKeys()).to.eql(['attr1']);
    });
  });

  describe('#get', () => {
    it('returns null if attribute not set', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.get('attr1')).to.be(null);
    });

    it('returns the attribute value if set', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.set('attr1', 'value1');
      expect(slot.get('attr1')).to.be('value1');
    });
  });

  describe('#set', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.set('attr1', 'value1')).to.eql(slot);
    });

    it('saves the value', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.set('attr1', 'value1');
      expect(slot.get('attr1')).to.be('value1');
    });
  });

  describe('#getTargeting', () => {
    it('returns the null is not set', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.be.empty();
    });

    it('returns the value (as an array) if set', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', 'value');
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.eql(['value']);
    });
  });

  describe('#getTargetingKeys', () => {
    it('returns empty array if no keys', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getTargetingKeys()).to.be.an('array');
      expect(slot.getTargetingKeys()).to.be.empty();
    });

    it('returns array of keys', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', 'value1');
      slot.setTargeting('kv2', 'value2');
      expect(slot.getTargetingKeys()).to.be.an('array');
      expect(slot.getTargetingKeys()).to.eql(['kv1', 'kv2']);
    });
  });

  describe('#setTargeting', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.setTargeting('kv1', 'value1')).to.be(slot);
    });

    it('saves the value', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', 'value');
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.eql(['value']);
    });

    it('overwrites the previous value', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', 'value1');
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.eql(['value1']);
      slot.setTargeting('kv1', 'value2');
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.eql(['value2']);
    });
  });

  describe('#updateTargetingFromMap', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.updateTargetingFromMap({})).to.be(slot);
    });

    it('copies the map values', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.updateTargetingFromMap({
        kv1: 'value1',
        kv2: 'value2'
      });
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.eql(['value1']);
      expect(slot.getTargeting('kv2')).to.be.an('array');
      expect(slot.getTargeting('kv2')).to.eql(['value2']);
    });

    it('overwrites existing the values', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', 'value3');
      slot.updateTargetingFromMap({
        kv1: 'value1',
        kv2: 'value2'
      });
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.eql(['value1']);
      expect(slot.getTargeting('kv2')).to.be.an('array');
      expect(slot.getTargeting('kv2')).to.eql(['value2']);
    });
  });

  describe('#clearTargeting', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.clearTargeting()).to.be(slot);
    });

    it('clears all targeting', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', 'value1');
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.eql(['value1']);
      slot.clearTargeting();
      expect(slot.getTargeting('kv1')).to.be.an('array');
      expect(slot.getTargeting('kv1')).to.empty();
    });
  });

  describe('#addService', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      const service = new Service(gt, 'test');
      expect(slot.addService(service)).to.be(slot);
    });

    it('adds service to list of services for the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      const service = new Service(gt, 'test');
      slot.addService(service);
      expect(slot._services).to.be.an('array');
      expect(slot._services).to.have.length(1);
      expect(slot._services[0]).to.be(service);
    });

    it('adds the slot to the service', sinon.test(function() {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv);
      const mock = this.mock(service);
      mock.expects('_addSlot').once().withArgs(slot);
      slot.addService(service);
    }));
  });

  describe('#getCategoryExclusions', () => {
    it('returns empty array if no exclusions', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getCategoryExclusions()).to.be.an('array');
      expect(slot.getCategoryExclusions()).to.be.empty();
    });

    it('returns array of exclusions if set', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setCategoryExclusion('e1');
      slot.setCategoryExclusion('e2');
      expect(slot.getCategoryExclusions()).to.be.an('array');
      expect(slot.getCategoryExclusions()).to.eql(['e1', 'e2']);
    });
  });

  describe('#setCategoryExclusion', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.setCategoryExclusion('e1')).to.be(slot);
    });

    it('appends to the exclusions', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getCategoryExclusions()).to.be.an('array');
      expect(slot.getCategoryExclusions()).to.be.empty();
      slot.setCategoryExclusion('e1');
      expect(slot.getCategoryExclusions()).to.eql(['e1']);
      slot.setCategoryExclusion('e2');
      expect(slot.getCategoryExclusions()).to.eql(['e1', 'e2']);
    });
  });

  describe('#clearCategoryExclusions', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.clearCategoryExclusions()).to.be(slot);
    });

    it('clears the exclusions', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getCategoryExclusions()).to.be.an('array');
      expect(slot.getCategoryExclusions()).to.be.empty();
      slot.setCategoryExclusion('e1');
      expect(slot.getCategoryExclusions()).to.eql(['e1']);
      slot.clearCategoryExclusions();
      expect(slot.getCategoryExclusions()).to.be.empty();
    });
  });

  describe('#defineSizeMapping', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.defineSizeMapping([])).to.be(slot);
    });

    it('overwrites the previous size mapping', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot._sizeMapping).to.be(null);
      slot.defineSizeMapping([]);
      expect(slot._sizeMapping).to.eql([]);
    });
  });

  describe('#setClickUrl', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.setClickUrl(clickUrl)).to.be(slot);
    });

    it('saves the click URL', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setClickUrl(clickUrl);
      expect(slot._clickUrl).to.be(clickUrl);
    });
  });

  describe('#getClickUrl', () => {
    it('returns null if no click URL', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getClickUrl()).to.be(null);
    });

    it('returns the previously set click URL', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setClickUrl(clickUrl);
      expect(slot.getClickUrl()).to.be(clickUrl);
    });
  });

  describe('#getResponseInformation', () => {
    it('returns null if no response information', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getResponseInformation()).to.be(null);
    });

    it('returns previous response information if set', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      const advertiserId = 'adv';
      const campaignId = 'camp';
      const lineItemId = 123;
      const creativeId = 456;
      const labelIds = ['label1', 'label2'];
      const info = new ResponseInformation(advertiserId, campaignId, lineItemId,
        creativeId, labelIds);
      slot._responseInformation = info;
      expect(slot.getResponseInformation()).to.be(info);
    });
  });

  describe('#setCollapseEmptyDiv', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot._options.collapseEmptyDiv).to.be(false);
      expect(slot._options.collapseBeforeAdFetch).to.be(false);
      expect(slot.setCollapseEmptyDiv(true)).to.be(slot);
    });

    it('saves the option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setCollapseEmptyDiv(true);
      expect(slot._options.collapseEmptyDiv).to.be(true);
    });

    it('saves the beforeAdFetch option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setCollapseEmptyDiv(true, true);
      expect(slot._options.collapseEmptyDiv).to.be(true);
      expect(slot._options.collapseBeforeAdFetch).to.be(true);
    });
  });

  describe('#setForceSafeFrame', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.setForceSafeFrame(true)).to.be(slot);
    });

    it('saves the value', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setForceSafeFrame(true);
      expect(slot._options.forceSafeFrame).to.be(true);
    });
  });

  describe('#setSafeFrameConfig', () => {
    it('returns the slot', () => {
      const allowOverlayExpansion = true;
      const allowPushExpansion = true;
      const sandbox = true;
      const config = new SafeFrameConfig(allowOverlayExpansion, allowPushExpansion, sandbox);
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.setSafeFrameConfig(config)).to.be(slot);
    });

    it('saves the config', () => {
      const allowOverlayExpansion = true;
      const allowPushExpansion = true;
      const sandbox = true;
      const config = new SafeFrameConfig(allowOverlayExpansion, allowPushExpansion, sandbox);
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setSafeFrameConfig(config);
      expect(slot._options.safeFrameConfig).to.eql(config);
    });
  });

});
