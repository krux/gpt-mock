import PubAdsService from '../../src/PubAdsService';
import GPT from '../../src/GPT';

describe('PubAdsService', () => {
  const gt = new GPT();

  describe('#constructor', () => {
    it('constructs', () => {
      const service = new PubAdsService(gt);
      expect(service).to.be.ok();
    });
  });
});

// TODO: PubAdsService
//   constructor(gt) {
//   _onEnable() {
//     this._gt.pubadsReady = true;
//   refresh(optSlots, optOptions) {
//     let slots = this._gt._slots;
//     if (optSlots == null) {
//       slots = optSlots;
//     }
//     for (let slot of slots) {
//       slot._refresh();
//     }
//     if (optOptions && optOptions.changeCorrelator) {
//       // TODO - change correlator
//     }
//   clear(optSlots) {
//     let slots = this._gt._slots;
//     if (optSlots == null) {
//       slots = optSlots;
//     }
//     for (let slot of slots) {
//       slot._clear();
//     }
//   defineOutOfPagePassback(adUnitPath) {
//     if (adUnitPath != null) {
//       const slot = new Slot(adUnitPath).addService(this);
//       slot._passback = true;
//       slot._outOfPage = true;
//       return this._addSlot(slot);
//     } else {
//       return null;
//     }
//   definePassback(adUnitPath, size) {
//     if (adUnitPath != null && size != null) {
//       const slot = new Slot(adUnitPath, size).addService(this);
//       slot._passback = true;
//       return this._addSlot(slot);
//     } else {
//       return null;
//     }
//   disableInitialLoad() {
//     this._options.initialLoad = false;
//   enableAsyncRendering() {
//     this._options.asyncRendering = true;
//   enableSingleRequest() {
//     this._options.singleRequest = true;
//   enableSyncRendering() {
//     this._options.syncRendering = true;
//   enableVideoAds() {
//     this._options.videoAds = true;
//   setTargeting(key, value) {
//     if (Array.isArray(value)) {
//       this._targeting[key] = value;
//     } else {
//       this._targeting[key] = [value];
//     }
//   getTargeting(key) {
//     return this._targeting[key] || [];
//   getTargetingKeys() {
//     return Object.keys(this._targeting);
//   clearTargeting(key) {
//     delete this._targeting[key];
//   collapseEmptyDivs(optCollapseBeforeAdFetch) {
//     this._options.collapseEmptyDivs = true;
//     this._options.collapseBeforeAdFetch = optCollapseBeforeAdFetch;
//   setCategoryExclusion(categoryExclusion) {
//     this._categoryExclusions.push(categoryExclusion);
//   clearCategoryExclusions() {
//     this._categoryExclusions = [];
//   _getCategoryExclusions() {
//     return this._categoryExclusions.slice(0);
//   setCentering(centerAds) {
//     this._options.centerAds = centerAds;
//   setCookieOptions(options) {
//     this._options.cookieOptions = options;
//   setForceSafeFrame(forceSafeFrame) {
//     this._options.forceSafeFrame = forceSafeFrame;
//   setLocation(latitudeOrAddress, optLongitude, optRadius) {
//     if (typeof latitudeOrAddress === 'number') {
//       this._options.latitude = latitudeOrAddress;
//       this._options.longitude = optLongitude;
//       this._options.radius = optRadius;
//       this._options.address = null;
//     } else {
//       this._options.address = latitudeOrAddress;
//       this._options.latitude = null;
//       this._options.longitude = null;
//       this._options.radius = null;
//     }
//   setPublisherProvidedId(ppid) {
//     this._options.ppid = ppid;
//   setSafeFrameConfig(config) {
//     this._options.safeFrameConfig = config;
//   setTagForChildDirectedTreatment(value) {
//     this._options.tagForChildDirectedTreatment = value;
//   clearTagForChildDirectedTreatment() {
//     this._options.tagForChildDirectedTreatment = null;
//   setVideoContent(videoContentId, videoCmsId) {
//     this._options.videoContentId = videoContentId;
//     this._options.videoCmsId = videoCmsId;
//   updateCorrelator() {
//     return this;
