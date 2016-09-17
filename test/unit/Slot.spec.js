import GPT from '../../src/GPT';
import Slot from '../../src/Slot';
import Service from '../../src/Service';
import ResponseInformation from '../../src/ResponseInformation';
import SafeFrameConfig from '../../src/SafeFrameConfig';
import SlotOnloadEvent from '../../src/events/SlotOnloadEvent';
import SlotRenderEndedEvent from '../../src/events/SlotRenderEndedEvent';
import ImpressionViewableEvent from '../../src/events/ImpressionViewableEvent';
import SlotVisibilityChangedEvent from '../../src/events/SlotVisibilityChangedEvent';

/** @test {Slot} */
describe('Slot', () => {
  const adUnitPath = '/Test/12345';
  const optDiv = 'gpt-div-123';
  const optDivNull = null;
  const size = [728, 90];
  const gt = new GPT();
  const clickUrl = 'http://www.google.com/';
  const advertiserId = 'adv';
  const campaignId = 'camp';
  const lineItemId = 123;
  const creativeId = 456;
  const labelIds = ['label1', 'label2'];
  const info = new ResponseInformation(advertiserId, campaignId, lineItemId,
    creativeId, labelIds);

  /** @test {Slot#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot).to.be.ok();
    });
  });

  /** @test {Slot#getName} */
  describe('#getName', () => {
    it('returns the adUnitPath', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getName()).to.be(adUnitPath);
    });
  });

  /** @test {Slot#getDefinedId} */
  describe('#getDefinedId', () => {
    it('returns the instance', () => {
      const slot = new Slot(adUnitPath, size, optDiv, 123);
      expect(slot.getDefinedId()).to.be(123);
    });
  });

  /** @test {Slot#getAdUnitPath} */
  describe('#getAdUnitPath', () => {
    it('returns the adUnitPath', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getAdUnitPath()).to.be(adUnitPath);
    });
  });

  /** @test {Slot#getSlotElementId} */
  describe('#getSlotElementId', () => {
    it('returns the optDiv', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getSlotElementId()).to.be(optDiv);
    });

    it('returns a generated ID if necessary', () => {
      const slot = new Slot(adUnitPath, size, optDivNull);
      expect(slot.getSlotElementId()).to.be(`gpt_unit_${adUnitPath}_0`);
    });
  });

  /** @test {Slot#getServices} */
  describe('#getServices', () => {
    it('returns the services', () => {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      expect(slot.getServices()).to.be.an('array');
      expect(slot.getServices()).to.be.eql([service]);
    });
  });

  /** @test {Slot#getSizes} */
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

  /** @test {Slot#getOutOfPage} */
  describe('#getOutOfPage', () => {
    it('returns the outOfPage status', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getOutOfPage()).to.be.a('boolean');
      expect(slot.getOutOfPage()).to.be(false);
      slot._options.outOfPage = true;
      expect(slot.getOutOfPage()).to.be(true);
    });
  });

  /** @test {Slot#display} */
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

  /** @test {Slot#getAttributeKeys} */
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

  /** @test {Slot#_getAttributes} */
  describe('#_getAttributes', () => {
    it('returns the attribute map', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.set('attr1', 'value1');
      expect(slot._getAttributes()).to.eql({
        attr1: 'value1'
      });
    });
  });

  /** @test {Slot#get} */
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

  /** @test {Slot#set} */
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

  /** @test {Slot#getTargeting} */
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

  /** @test {Slot#getTargetingKeys} */
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

  /** @test {Slot#getTargetingMap} */
  describe('getTargetingMap', () => {
    it('returns the targeting map', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', 'value1');
      slot.setTargeting('kv2', 'value2');
      expect(slot.getTargetingMap()).to.be.an('object');
      expect(slot.getTargetingMap()).to.eql({
        kv1: ['value1'],
        kv2: ['value2']
      });
    });
  });

  /** @test {Slot#setTargeting} */
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

    it('saves the array value', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setTargeting('kv1', ['value']);
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

  /** @test {Slot#updateTargetingFromMap} */
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

  /** @test {Slot#clearTargeting} */
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

  /** @test {Slot#addService} */
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

  /** @test {Slot#getCategoryExclusions} */
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

  /** @test {Slot#setCategoryExclusion} */
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

  /** @test {Slot#clearCategoryExclusions} */
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

  /** @test {Slot#defineSizeMapping} */
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

    it('throws an error on invalid size mapping', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot._sizeMapping).to.be(null);
      expect(() => slot.defineSizeMapping('bob')).to.throwError();
      expect(slot._sizeMapping).to.be(null);
    });
  });

  /** @test {Slot#setClickUrl} */
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

  /** @test {Slot#getClickUrl} */
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

  /** @test {Slot#getResponseInformation} */
  describe('#getResponseInformation', () => {
    it('returns null if no response information', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getResponseInformation()).to.be(null);
    });

    it('returns previous response information if set', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot._responseInformation = info;
      expect(slot.getResponseInformation()).to.be(info);
    });
  });

  /** @test {Slot#setCollapseEmptyDiv} */
  describe('#setCollapseEmptyDiv', () => {
    it('returns the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot._options.collapseEmptyDiv).to.be(false);
      expect(slot._options.collapseBeforeAdFetch).to.be(false);
      expect(slot.setCollapseEmptyDiv(true)).to.be(slot);
    });

    it('saves the collapseEmptyDiv option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setCollapseEmptyDiv(true);
      expect(slot._options.collapseEmptyDiv).to.be(true);
    });

    it('saves the collapseBeforeAdFetch option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.setCollapseEmptyDiv(true, true);
      expect(slot._options.collapseEmptyDiv).to.be(true);
      expect(slot._options.collapseBeforeAdFetch).to.be(true);
    });
  });

  /** @test {Slot#getCollapseEmptyDiv} */
  describe('#getCollapseEmptyDiv', () => {
    it('returns the collapseEmptyDiv options', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot.getCollapseEmptyDiv()).to.be(false);
      slot.setCollapseEmptyDiv(true);
      expect(slot.getCollapseEmptyDiv()).to.be(true);
    });
  });

  /** @test {Slot#setForceSafeFrame} */
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

  /** @test {Slot#setSafeFrameConfig} */
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

  /** @test {Slot#fetchStarted} */
  describe('#fetchStarted', () => {
    it('clears the fetched option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot._options.fetched = true;
      slot.fetchStarted();
      expect(slot._options.fetched).to.be(false);
    });
  });

  /** @test {Slot#fetchEnded} */
  describe('#fetchEnded', () => {
    it('sets the fetched option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot._options.fetched).to.be(false);
      slot.fetchStarted();
      slot.fetchEnded();
      expect(slot._options.fetched).to.be(true);
    });
  });

  /** @test {Slot#loaded} */
  describe('#loaded', () => {
    it('broadcasts the event', () => {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      const spy = sinon.spy();
      service.addEventListener('googletag.events.SlotOnloadEvent', spy);
      slot.loaded();
      expect(spy.called).to.be(true);
      expect(spy.calledWith(new SlotOnloadEvent(service.getName(), slot))).to.be(true);
    });
  });

  /** @test {Slot#renderStarted} */
  describe('#renderStarted', () => {
    it('clears the displayed option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot._options.displayed = true;
      slot.renderStarted();
      expect(slot._options.displayed).to.be(false);
    });
  });

  /** @test {Slot#renderEnded} */
  describe('#renderEnded', () => {
    it('sets the displayed option', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.renderStarted();
      slot.renderEnded();
      expect(slot._options.displayed).to.be(true);
    });

    it('sets the response information', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      slot.renderStarted();
      slot.renderEnded(info);
      expect(slot._responseInformation).to.be(info);
    });

    it('broadcasts an empty event if null', () => {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      const spy = sinon.spy();
      service.addEventListener('googletag.events.SlotRenderEndedEvent', spy);
      slot.renderStarted();
      slot.renderEnded(null);
      expect(spy.called).to.be(true);
      expect(spy.calledWith(new SlotRenderEndedEvent(service.getName(), slot,
        null, null, true, slot.getSizes()[0]))).to.be(true);
    });

    it('broadcasts a non-empty event if info provided', () => {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      const spy = sinon.spy();
      service.addEventListener('googletag.events.SlotRenderEndedEvent', spy);
      slot.renderStarted();
      slot.renderEnded(info);
      expect(spy.called).to.be(true);
      expect(spy.calledWith(new SlotRenderEndedEvent(service.getName(), slot,
        info.creativeId, info.lineItemId, false, slot.getSizes()[0]))).to.be(true);
    });
  });

  /** @test {Slot#impressionViewable} */
  describe('#impressionViewable', () => {
    it('broadcasts the event', () => {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      const spy = sinon.spy();
      service.addEventListener('googletag.events.ImpressionViewableEvent', spy);
      slot.impressionViewable();
      expect(spy.called).to.be(true);
      expect(spy.calledWith(new ImpressionViewableEvent(service.getName(), slot))).to.be(true);
    });
  });

  /** @test {Slot#visibilityChanged} */
  describe('#visibilityChanged', () => {
    it('saves the in-view percentage and broadcasts event', () => {
      const inViewPercentage = 23;
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      const spy = sinon.spy();
      service.addEventListener('googletag.events.SlotVisibilityChangedEvent', spy);
      slot.visibilityChanged(inViewPercentage);
      expect(slot._options.inViewPercentage).to.be(inViewPercentage);
      expect(spy.called).to.be(true);
      expect(spy.calledWith(new SlotVisibilityChangedEvent(service.getName(), slot, inViewPercentage))).to.be(true);
    });

    it('does not re-broadcast event if no change', () => {
      const inViewPercentage = 23;
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      const spy = sinon.spy();
      slot.visibilityChanged(inViewPercentage);
      service.addEventListener('googletag.events.SlotVisibilityChangedEvent', spy);
      expect(slot._options.inViewPercentage).to.be(inViewPercentage);
      slot.impressionViewable(inViewPercentage);
      expect(slot._options.inViewPercentage).to.be(inViewPercentage);
      expect(spy.called).to.be(false);
    });
  });

  /** @test {Slot#_refresh} */
  describe('#_refresh', () => {
    it('fetches the slot', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot._options.fetched).to.be(false);
      slot._refresh();
      expect(slot._options.fetched).to.be(true);
    });

    it('increments a refresh counter', () => {
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot._options.refreshed).to.be(0);
      slot._refresh();
      expect(slot._options.refreshed).to.be(1);
    });
  });

  /** @test {Slot#_clear} */
  describe('#_clear', () => {
    it('clears the content', () => {
      const content = 'CONTENT';
      const slot = new Slot(adUnitPath, size, optDiv);
      slot._setContent(content);
      slot._clear();
      expect(slot._options.content).to.be(null);
    });

    it('marks the slot as not fetched', () => {
      const content = 'CONTENT';
      const slot = new Slot(adUnitPath, size, optDiv);
      slot._setContent(content);
      slot._clear();
      expect(slot._options.fetched).to.be(false);
    });
  });

  /** @test {Slot#_setContent} */
  describe('#_setContent', () => {
    it('saves the content', () => {
      const content = 'CONTENT';
      const slot = new Slot(adUnitPath, size, optDiv);
      slot._setContent(content);
      expect(slot._options.content).to.be(content);
    });
  });

  /** @test {Slot#_getContent} */
  describe('#_getContent', () => {
    it('returns the content', () => {
      const content = 'CONTENT';
      const slot = new Slot(adUnitPath, size, optDiv);
      slot._setContent(content);
      expect(slot._getContent()).to.be(content);
    });
  });

  /** @test {Slot#_removeServices} */
  describe('#_removeServices', () => {
    it('removes all the services', () => {
      const service = new Service(gt, 'test');
      const slot = new Slot(adUnitPath, size, optDiv).addService(service);
      expect(slot.getServices()).to.be.an('array');
      expect(slot.getServices()).to.be.eql([service]);
      slot._removeServices();
      expect(slot.getServices()).to.be.an('array');
      expect(slot.getServices()).to.be.empty();
    });
  });

});
