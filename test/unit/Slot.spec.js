import Slot from '../../src/Slot';

describe('Slot', () => {
  describe('#constructor', () => {
    it('constructs', () => {
      const adUnitPath = '';
      const optDiv = null;
      const size = [728, 90];
      const slot = new Slot(adUnitPath, size, optDiv);
      expect(slot).to.be.ok();
    });
  });
});

// TODO: Slot
//   constructor(adUnitPath, size, optDiv) {
//   getAdUnitPath() {
//   getSlotElementId() {
//   getServices() {
//     return this._services.slice(0);
//   getSizes() {
//     return this._size;
//   getOutOfPage() {
//     return this._options.outOfPage;
//   display() {
//     this._options.displayed = true;
//   getAttributeKeys() {
//     return Object.keys(this._attributes);
//   get(key) {
//     return this._attributes[key] || null;
//   set(key, value) {
//     this._attributes[key] = value;
//   _getAttributes() {
//     return Object.assign({}, this._attributes);
//   getTargeting(key) {
//     return this._targeting[key] || [];
//   getTargetingKeys() {
//     return Object.keys(this._targeting);
//   setTargeting(key, value) {
//     if (Array.isArray(value)) {
//       this._targeting[key] = value;
//     } else {
//       this._targeting[key] = [value];
//     }
//   updateTargetingFromMap(map) {
//     for (let key in map) {
//       if (map.hasOwnProperty(key)) {
//         this.setTargeting(key, map[key]);
//       }
//     }
//     return this;
//   clearTargeting() {
//     this._targeting = {};
//     return this;
//   _getTargetingMap() {
//     return Object.assign({}, this._targeting);
//   addService(service) {
//     this._services.push(service);
//     service._addSlot(this);
//   _hasService(service) {
//     return this._services.indexOf(service) !== -1;
//   getCategoryExclusions() {
//     return this._categoryExclusions.slice(0);
//   setCategoryExclusion(categoryExclusion) {
//     this._categoryExclusions.push(categoryExclusion);
//   clearCategoryExclusions() {
//     this._categoryExclusions = [];
//   defineSizeMapping(sizeMapping) {
//     this._sizeMapping = sizeMapping;
//   _getSizeMapping() {
//     if (this._sizeMapping != null) {
//       return this._sizeMapping.slice(0);
//     } else {
//       return null;
//     }
//   setClickUrl(value) {
//     this._clickUrl = value;
//   getClickUrl() {
//     return this._clickUrl;
//   getResponseInformation() {
//     return this._responseInformation;
//   _setResponseInformation(responseInformation) {
//     this._responseInformation = responseInformation;
//   setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch) {
//     this._options.collapseEmptyDiv = collapse;
//     if (collapse) {
//       this._options.collapseBeforeAdFetch = optCollapseBeforeAdFetch;
//     }
//   setForceSafeFrame(forceSafeFrame) {
//     this._options.forceSafeFrame = forceSafeFrame;
//   setSafeFrameConfig(config) {
//     this._options.safeFrameConfig = config;
//   _refresh() {
//     this._options.refreshed += 1;
//     this._options.fetched = true;
//   _clear() {
//     this._options.content = null;
//     this._options.fetched = null;
//   _setContent(content) {
//     this._options.content = content;
