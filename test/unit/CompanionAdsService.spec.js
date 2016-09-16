import CompanionAdsService from '../../src/CompanionAdsService';
import GPT from '../../src/GPT';

describe('CompanionAdsService', () => {
  const gt = new GPT();

  describe('#constructor', () => {
    it('constructs', () => {
      const service = new CompanionAdsService(gt);
      expect(service).to.be.ok();
      expect(service).to.have.property('_gt', gt);
    });
  });

  describe('#enableSyncLoading', () => {
    it('sets syncLoading option', () => {
      const service = new CompanionAdsService(gt);
      service.enableSyncLoading();
      expect(service._options).to.have.property('syncLoading', true);
    });

    it('returns undefined', () => {
      const service = new CompanionAdsService(gt);
      expect(service.enableSyncLoading()).to.not.be.ok();
    });
  });

  describe('#setRefreshUnfilledSlots', () => {
    it('sets refreshUnfilledSlots option', () => {
      const service = new CompanionAdsService(gt);
      service.setRefreshUnfilledSlots(true);
      expect(service._options).to.have.property('refreshUnfilledSlots', true);
    });

    it('returns undefined', () => {
      const service = new CompanionAdsService(gt);
      expect(service.setRefreshUnfilledSlots()).to.not.be.ok();
    });
  });
});
