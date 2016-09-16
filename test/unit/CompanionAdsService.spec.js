import CompanionAdsService from '../../src/CompanionAdsService';
import GPT from '../../src/GPT';

describe('CompanionAdsService', () => {
  const gt = new GPT();

  describe('#constructor', () => {
    it('constructs', () => {
      const service = new CompanionAdsService(gt);
      expect(service).to.be.ok();
    });
  });
});

// TODO CompanionAdsService
//  constructor(gt) {
//  enableSyncLoading() {
//    this._options.syncLoading = true;
//  setRefreshUnfilledSlots(value) {
//     this._options.refreshUnfilledSlots = value;
// refreshAllSlots()
// fillSlot(a, b, c, d)
// notifyUnfilledSlots(a)
// setClearUnfilledSlots(a)
// getDisplayAdsCorrelator()
// getVideoStreamCorrelator()
// isRoadblockingSupported()
// isSlotAPersistentRoadblock()
