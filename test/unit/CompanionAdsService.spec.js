import CompanionAdsService from '../../src/CompanionAdsService';
import GPT from '../../src/GPT';

/** @test {CompanionAdsService} */
describe('CompanionAdsService', () => {
  const gpt = new GPT();

  /** @test {CompanionAdsService#constructor} */
  describe('#constructor', () => {
    it('constructs', () => {
      const service = new CompanionAdsService(gpt);
      expect(service).to.be.ok();
      expect(service).to.have.property('_gpt', gpt);
    });
  });

  /** @test {CompanionAdsService#enableSyncLoading} */
  describe('#enableSyncLoading', () => {
    it('sets syncLoading option', () => {
      const service = new CompanionAdsService(gpt);
      service.enableSyncLoading();
      expect(service._options).to.have.property('syncLoading', true);
    });

    it('returns undefined', () => {
      const service = new CompanionAdsService(gpt);
      expect(service.enableSyncLoading()).to.be(undefined);
    });
  });

  /** @test {CompanionAdsService#setRefreshUnfilledSlots} */
  describe('#setRefreshUnfilledSlots', () => {
    it('sets refreshUnfilledSlots option', () => {
      const service = new CompanionAdsService(gpt);
      service.setRefreshUnfilledSlots(true);
      expect(service._options).to.have.property('refreshUnfilledSlots', true);
    });

    it('returns undefined', () => {
      const service = new CompanionAdsService(gpt);
      expect(service.setRefreshUnfilledSlots()).to.be(undefined);
    });
  });
});
