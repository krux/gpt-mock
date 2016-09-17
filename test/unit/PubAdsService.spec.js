import PubAdsService from '../../src/PubAdsService';
import SafeFrameConfig from '../../src/SafeFrameConfig';
import GPT from '../../src/GPT';
import Slot from '../../src/Slot';

/** @test {PubAdsService} */
describe('PubAdsService', () => {
  const gt = new GPT();
  const adUnitPath = '/Test/12345';
  const size = [728, 90];

  /** @test {PubAdsService#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const service = new PubAdsService(gt);
      expect(service).to.be.ok();
    });
  });

  /** @test {PubAdsService#enable} */
  describe('#enable', () => {
    it('returns undefined', () => {
      const service = new PubAdsService(gt);
      expect(service.enable()).to.be(undefined);
    });

    it('sets the pubadsReady flag', () => {
      const gt = new GPT();
      const service = new PubAdsService(gt);
      expect(gt.pubadsReady).to.be(undefined);
      service.enable();
      expect(gt.pubadsReady).to.be(true);
    });
  });

  /** @test {PubAdsService#refresh} */
  describe('#refresh', () => {
    it('returns undefined', () => {
      const service = new PubAdsService(gt);
      const correlator = service._correlator;
      expect(service.refresh()).to.be(undefined);
      expect(service._correlator).to.be(correlator);
    });

    it('updates the correlator', () => {
      const service = new PubAdsService(gt);
      const correlator = service._correlator;
      service.refresh(null, {changeCorrelator: true});
      expect(service._correlator).to.not.be(correlator);
    });

    it('fetches all ads', () => {
      const service = new PubAdsService(gt);
      const slot = service.definePassback(adUnitPath, size);
      expect(slot._options.refreshed).to.be(0);
      expect(slot._options.fetched).to.be(false);
      service.refresh();
      expect(slot._options.refreshed).to.be(1);
      expect(slot._options.fetched).to.be(true);
      service.refresh();
      expect(slot._options.refreshed).to.be(2);
      expect(slot._options.fetched).to.be(true);
    });

    it('fetches specified ads', () => {
      const service = new PubAdsService(gt);
      const slot1 = service.definePassback(adUnitPath, size);
      const slot2 = service.definePassback(adUnitPath, size);
      expect(slot1._options.refreshed).to.be(0);
      expect(slot1._options.fetched).to.be(false);
      expect(slot2._options.refreshed).to.be(0);
      expect(slot2._options.fetched).to.be(false);
      service.refresh([slot2]);
      expect(slot1._options.refreshed).to.be(0);
      expect(slot1._options.fetched).to.be(false);
      expect(slot2._options.refreshed).to.be(1);
      expect(slot2._options.fetched).to.be(true);
      service.refresh([slot2]);
      expect(slot1._options.refreshed).to.be(0);
      expect(slot1._options.fetched).to.be(false);
      expect(slot2._options.refreshed).to.be(2);
      expect(slot2._options.fetched).to.be(true);
      service.refresh([slot1]);
      expect(slot1._options.refreshed).to.be(1);
      expect(slot1._options.fetched).to.be(true);
      expect(slot2._options.refreshed).to.be(2);
      expect(slot2._options.fetched).to.be(true);
    });
  });

  /** @test {PubAdsService#clear} */
  describe('#clear', () => {
    const content = 'TEST CONTENT';

    it('returns true if no slots registered', () => {
      const service = new PubAdsService(gt);
      expect(service.clear()).to.be(true);
    });

    it('returns true if slots registered and clearing all', () => {
      const service = new PubAdsService(gt);
      const slot = service.definePassback(adUnitPath, size);
      slot._setContent(content);
      expect(slot._getContent()).to.be(content);
      expect(service.clear()).to.be(true);
      expect(slot._getContent()).to.be(null);
    });

    it('returns true if slots registered and clearing existing', () => {
      const service = new PubAdsService(gt);
      const slot = service.definePassback(adUnitPath, size);
      slot._setContent(content);
      expect(slot._getContent()).to.be(content);
      expect(service.clear([slot])).to.be(true);
      expect(slot._getContent()).to.be(null);
    });

    it('returns false if slots registered and clearing non-existing', () => {
      const service = new PubAdsService(gt);
      const slot = service.definePassback(adUnitPath, size);
      const unrelatedSlot = new Slot(adUnitPath, size);
      slot._setContent(content);
      expect(slot._getContent()).to.be(content);
      expect(service.clear([unrelatedSlot])).to.be(false);
      expect(slot._getContent()).to.be(content);
    });

    it('clears only specified', () => {
      const service = new PubAdsService(gt);
      const slot1 = service.definePassback(adUnitPath, size);
      const slot2 = service.definePassback(adUnitPath, size);
      slot1._setContent(content);
      slot2._setContent(content);
      expect(slot1._getContent()).to.be(content);
      expect(slot2._getContent()).to.be(content);
      expect(service.clear([slot2])).to.be(true);
      expect(slot1._getContent()).to.be(content);
      expect(slot2._getContent()).to.be(null);

    });
  });

  /** @test {PubAdsService#defineOutOfPagePassback} */
  describe('#defineOutOfPagePassback', () => {
    it('returns the null if no adUnitPath', () => {
      const service = new PubAdsService(gt);
      expect(service.defineOutOfPagePassback()).to.be(null);
    });

    it('returns slot if adUnitPath provided', () => {
      const service = new PubAdsService(gt);
      const slot = service.defineOutOfPagePassback(adUnitPath);
      expect(slot).to.be.ok();
      expect(slot.getAdUnitPath()).to.be(adUnitPath);
      expect(slot._passback).to.be(true);
      expect(slot._outOfPage).to.be(true);
    });
  });

  /** @test {PubAdsService#definePassback} */
  describe('#definePassback', () => {
    it('returns the null if no adUnitPath', () => {
      const service = new PubAdsService(gt);
      expect(service.definePassback()).to.be(null);
    });

    it('returns the null if no size', () => {
      const service = new PubAdsService(gt);
      expect(service.definePassback(adUnitPath)).to.be(null);
    });

    it('returns slot if adUnitPath and size provided', () => {
      const service = new PubAdsService(gt);
      const slot = service.definePassback(adUnitPath, size);
      expect(slot).to.be.ok();
      expect(slot.getAdUnitPath()).to.be(adUnitPath);
      expect(slot.getSizes()).to.be.an('array');
      expect(slot.getSizes()).to.have.length(1);
      expect(slot.getSizes()[0].getWidth()).to.be(size[0]);
      expect(slot.getSizes()[0].getHeight()).to.be(size[1]);
      expect(slot._passback).to.be(true);
    });
  });

  /** @test {PubAdsService#disableInitialLoad} */
  describe('#disableInitialLoad', () => {
    it('returns undefined', () => {
      const service = new PubAdsService(gt);
      expect(service.disableInitialLoad()).to.be(undefined);
    });

    it('sets the initialLoad flag', () => {
      const service = new PubAdsService(gt);
      expect(service._options.initialLoad).to.be(true);
      service.disableInitialLoad();
      expect(service._options.initialLoad).to.be(false);
    });
  });

  /** @test {PubAdsService#enableAsyncRendering} */
  describe('#enableAsyncRendering', () => {
    it('returns true if not enabled', () => {
      const service = new PubAdsService(gt);
      expect(service.enableAsyncRendering()).to.be(true);
    });

    it('returns false if enabled', () => {
      const service = new PubAdsService(gt);
      service.enable();
      expect(service.enableAsyncRendering()).to.be(false);
    });

    it('sets the asyncRendering flag', () => {
      const service = new PubAdsService(gt);
      expect(service._options.asyncRendering).to.be(false);
      service.enableAsyncRendering();
      expect(service._options.asyncRendering).to.be(true);
    });
  });

  /** @test {PubAdsService#enableSingleRequest} */
  describe('#enableSingleRequest', () => {
    it('returns true if not enabled', () => {
      const service = new PubAdsService(gt);
      expect(service.enableSingleRequest()).to.be(true);
    });

    it('returns false if enabled', () => {
      const service = new PubAdsService(gt);
      service.enable();
      expect(service.enableSingleRequest()).to.be(false);
    });

    it('sets the asyncRendering flag', () => {
      const service = new PubAdsService(gt);
      expect(service._options.singleRequest).to.be(false);
      service.enableSingleRequest();
      expect(service._options.singleRequest).to.be(true);
    });
  });

  /** @test {PubAdsService#enableSyncRendering} */
  describe('#enableSyncRendering', () => {
    it('returns true if not enabled', () => {
      const service = new PubAdsService(gt);
      expect(service.enableSyncRendering()).to.be(true);
    });

    it('returns false if enabled', () => {
      const service = new PubAdsService(gt);
      service.enable();
      expect(service.enableSyncRendering()).to.be(false);
    });

    it('sets the syncRendering flag', () => {
      const service = new PubAdsService(gt);
      expect(service._options.syncRendering).to.be(false);
      service.enableSyncRendering();
      expect(service._options.syncRendering).to.be(true);
    });
  });

  /** @test {PubAdsService#enableVideoAds} */
  describe('#enableVideoAds', () => {
    it('returns undefined', () => {
      const service = new PubAdsService(gt);
      expect(service.enableVideoAds()).to.be(undefined);
    });

    it('sets the videoAds flag', () => {
      const service = new PubAdsService(gt);
      expect(service._options.videoAds).to.be(false);
      service.enableVideoAds();
      expect(service._options.videoAds).to.be(true);
    });
  });

  /** @test {PubAdsService#setTargeting} */
  describe('#setTargeting', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setTargeting('kv1', 'value1')).to.be(service);
    });

    it('saves value as array if given a single value', () => {
      const service = new PubAdsService(gt);
      service.setTargeting('kv1', 'value1');
      expect(service.getTargeting('kv1')).to.eql(['value1']);
    });

    it('saves value as array if given an array value', () => {
      const service = new PubAdsService(gt);
      service.setTargeting('kv1', ['value1', 'value2']);
      expect(service.getTargeting('kv1')).to.eql(['value1', 'value2']);
    });
  });

  /** @test {PubAdsService#getTargeting} */
  describe('#getTargeting', () => {
    it('returns empty array if no value', () => {
      const service = new PubAdsService(gt);
      expect(service.getTargeting('kv1')).to.be.an('array');
      expect(service.getTargeting('kv1')).to.be.empty();
    });

    it('returns value as an array', () => {
      const service = new PubAdsService(gt);
      service.setTargeting('kv1', 'value1');
      expect(service.getTargeting('kv1')).to.be.an('array');
      expect(service.getTargeting('kv1')).to.eql(['value1']);
    });
  });

  /** @test {PubAdsService#getTargetingKeys} */
  describe('#getTargetingKeys', () => {
    it('returns empty array if no targeting', () => {
      const service = new PubAdsService(gt);
      expect(service.getTargetingKeys()).to.be.an('array');
      expect(service.getTargetingKeys()).to.be.empty();
    });

    it('returns array of keys', () => {
      const service = new PubAdsService(gt);
      service.setTargeting('kv1', 'value1');
      expect(service.getTargetingKeys()).to.be.an('array');
      expect(service.getTargetingKeys()).to.eql(['kv1']);
    });
  });

  /** @test {PubAdsService#clearTargeting} */
  describe('#clearTargeting', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.clearTargeting('kv1')).to.be(service);
    });

    it('clears targeting', () => {
      const service = new PubAdsService(gt);
      service.setTargeting('kv1', 'value1');
      expect(service.getTargetingKeys()).to.be.an('array');
      expect(service.getTargetingKeys()).to.eql(['kv1']);
      service.clearTargeting('kv1');
      expect(service.getTargetingKeys()).to.be.an('array');
      expect(service.getTargetingKeys()).to.empty();
    });
  });

  /** @test {PubAdsService#collapseEmptyDivs} */
  describe('#collapseEmptyDivs', () => {
    it('returns true if not enabled', () => {
      const service = new PubAdsService(gt);
      expect(service.collapseEmptyDivs()).to.be(true);
    });

    it('returns false if enabled', () => {
      const service = new PubAdsService(gt);
      service.enable();
      expect(service.collapseEmptyDivs()).to.be(false);
    });

    it('sets the collapseEmptyDivs flag', () => {
      const service = new PubAdsService(gt);
      expect(service._options.collapseEmptyDivs).to.be(false);
      service.collapseEmptyDivs();
      expect(service._options.collapseEmptyDivs).to.be(true);
    });

    it('sets the collapseBeforeAdFetch flag', () => {
      const service = new PubAdsService(gt);
      expect(service._options.collapseBeforeAdFetch).to.be(false);
      service.collapseEmptyDivs(true);
      expect(service._options.collapseBeforeAdFetch).to.be(true);
    });
  });

  /** @test {PubAdsService#setCategoryExclusion} */
  describe('#setCategoryExclusion', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setCategoryExclusion('ex1')).to.be(service);
    });

    it('adds an exclusion', () => {
      const service = new PubAdsService(gt);
      expect(service._categoryExclusions).to.be.an('array');
      expect(service._categoryExclusions).to.be.empty();
      service.setCategoryExclusion('ex1');
      expect(service._categoryExclusions).to.be.eql(['ex1']);
    });

    it('accumulates exclusions', () => {
      const service = new PubAdsService(gt);
      expect(service._categoryExclusions).to.be.an('array');
      expect(service._categoryExclusions).to.be.empty();
      service.setCategoryExclusion('ex1');
      expect(service._categoryExclusions).to.be.eql(['ex1']);
      service.setCategoryExclusion('ex2');
      expect(service._categoryExclusions).to.be.eql(['ex1', 'ex2']);
    });
  });

  /** @test {PubAdsService#clearCategoryExclusions} */
  describe('#clearCategoryExclusions', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.clearCategoryExclusions()).to.be(service);
    });

    it('clears the exclusions', () => {
      const service = new PubAdsService(gt);
      expect(service._categoryExclusions).to.be.an('array');
      expect(service._categoryExclusions).to.be.empty();
      service.setCategoryExclusion('ex1');
      expect(service._categoryExclusions).to.be.eql(['ex1']);
      service.setCategoryExclusion('ex2');
      expect(service._categoryExclusions).to.be.eql(['ex1', 'ex2']);
      service.clearCategoryExclusions();
      expect(service._categoryExclusions).to.be.empty();
    });
  });

  /** @test {PubAdsService#setCentering} */
  describe('#setCentering', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setCentering(1)).to.be(undefined);
    });

    it('sets the centerAds flag', () => {
      const service = new PubAdsService(gt);
      service.setCentering(1);
      expect(service._options.centerAds).to.be(1);
    });
  });

  /** @test {PubAdsService#setCookieOptions} */
  describe('#setCookieOptions', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setCookieOptions(1)).to.be(service);
    });

    it('does something else', () => {
      const service = new PubAdsService(gt);
      expect(service._options.cookieOptions).to.be(null);
      service.setCookieOptions(1);
      expect(service._options.cookieOptions).to.be(1);
    });
  });

  /** @test {PubAdsService#setForceSafeFrame} */
  describe('#setForceSafeFrame', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setForceSafeFrame(true)).to.be(service);
    });

    it('does something else', () => {
      const service = new PubAdsService(gt);
      expect(service._options.forceSafeFrame).to.be(false);
      service.setForceSafeFrame(true);
      expect(service._options.forceSafeFrame).to.be(true);
    });
  });

  /** @test {PubAdsService#setLocation} */
  describe('#setLocation', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setLocation(1.0)).to.be(service);
    });

    it('saves an address', () => {
      const address = '123 Main Street';
      const service = new PubAdsService(gt);
      service.setLocation(address);
      expect(service._options.address).to.be(address);
      expect(service._options.latitude).to.be(null);
      expect(service._options.longitude).to.be(null);
      expect(service._options.radius).to.be(null);
    });

    it('saves an lat/lon', () => {
      const latitude = 40.2524632;
      const longitude = 58.4374557;
      const service = new PubAdsService(gt);
      service.setLocation(latitude, longitude);
      expect(service._options.address).to.be(null);
      expect(service._options.latitude).to.be(latitude);
      expect(service._options.longitude).to.be(longitude);
      expect(service._options.radius).to.be(null);
    });

    it('saves an lat/lon with radius', () => {
      const latitude = 40.2524632;
      const longitude = 58.4374557;
      const radius = 100000;
      const service = new PubAdsService(gt);
      service.setLocation(latitude, longitude, radius);
      expect(service._options.address).to.be(null);
      expect(service._options.latitude).to.be(latitude);
      expect(service._options.longitude).to.be(longitude);
      expect(service._options.radius).to.be(radius);
    });
  });

  /** @test {PubAdsService#setPublisherProvidedId} */
  describe('#setPublisherProvidedId', () => {
    const ppid = 'ppid_1234567';

    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setPublisherProvidedId(ppid)).to.be(service);
    });

    it('saves the ppid', () => {
      const service = new PubAdsService(gt);
      service.setPublisherProvidedId(ppid);
      expect(service._options.ppid).to.be(ppid);
    });
  });

  /** @test {PubAdsService#setSafeFrameConfig} */
  describe('#setSafeFrameConfig', () => {
    it('returns the service', () => {
      const allowOverlayExpansion = true;
      const allowPushExpansion = true;
      const sandbox = true;
      const config = new SafeFrameConfig(allowOverlayExpansion, allowPushExpansion, sandbox);
      const service = new PubAdsService(gt);
      expect(service.setSafeFrameConfig(config)).to.be(service);
    });

    it('saves the config', () => {
      const allowOverlayExpansion = true;
      const allowPushExpansion = true;
      const sandbox = true;
      const config = new SafeFrameConfig(allowOverlayExpansion, allowPushExpansion, sandbox);
      const service = new PubAdsService(gt);
      service.setSafeFrameConfig(config);
      expect(service._options.safeFrameConfig).to.eql(config);
    });
  });

  /** @test {PubAdsService#setTagForChildDirectedTreatment} */
  describe('#setTagForChildDirectedTreatment', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.setTagForChildDirectedTreatment(1)).to.be(service);
    });

    it('does something else', () => {
      const service = new PubAdsService(gt);
      expect(service._options.tagForChildDirectedTreatment).to.be(null);
      service.setTagForChildDirectedTreatment(1);
      expect(service._options.tagForChildDirectedTreatment).to.be(1);
    });
  });

  /** @test {PubAdsService#clearTagForChildDirectedTreatment} */
  describe('#clearTagForChildDirectedTreatment', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.clearTagForChildDirectedTreatment()).to.be(service);
    });

    it('does something else', () => {
      const service = new PubAdsService(gt);
      expect(service._options.tagForChildDirectedTreatment).to.be(null);
      service.setTagForChildDirectedTreatment(1);
      expect(service._options.tagForChildDirectedTreatment).to.be(1);
      service.clearTagForChildDirectedTreatment();
      expect(service._options.tagForChildDirectedTreatment).to.be(null);
    });
  });

  /** @test {PubAdsService#setVideoContent} */
  describe('#setVideoContent', () => {
    const videoContentId = 'CONTENTID';
    const videoCmsId = 'CMSID';
    it('returns undefined', () => {
      const service = new PubAdsService(gt);
      expect(service.setVideoContent(videoContentId, videoCmsId)).to.be(undefined);
    });

    it('saves the ID\'s', () => {
      const service = new PubAdsService(gt);
      service.setVideoContent(videoContentId, videoCmsId);
      expect(service._options.videoContentId).to.be(videoContentId);
      expect(service._options.videoCmsId).to.be(videoCmsId);
    });
  });

  /** @test {PubAdsService#updateCorrelator} */
  describe('#updateCorrelator', () => {
    it('returns the service', () => {
      const service = new PubAdsService(gt);
      expect(service.updateCorrelator()).to.be(service);
    });
  });

});
