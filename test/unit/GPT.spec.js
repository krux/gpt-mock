import GPT from '../../src/GPT';

describe('GPT', () => {
  describe('#constructor', () => {
    it('constructs', () => {
      const gpt = new GPT();
      expect(gpt).to.be.ok();
    });
  });
});

// TODO GPT
//   constructor() {
//   getVersion() {
//     return '94';
//   companionAds() {
//     return this._services[CompanionAdsService._name];
//   content() {
//     return this._services[ContentService._name];
//   pubads() {
//     return this._services[PubAdsService._name];
//   enableServices() {
//     for (let service in this._services) {
//       if (this._services.hasOwnProperty(service)) {
//         this._services[service].enable();
//       }
//     }
//   sizeMapping() {
//     return new SizeMappingBuilder();
//   defineSlot(adUnitPath, size, optDiv) {
//     const slot = new Slot(adUnitPath, size, optDiv);
//     this._slots.push(slot);
//     return slot;
//   defineOutOfPageSlot(adUnitPath, optDiv) {
//     const slot = new Slot(adUnitPath, [], optDiv);
//     slot._outOfPage = true;
//     this._slots.push(slot);
//     return slot;
//   destroySlots(optSlots) {
//     if (optSlots == null) {
//       this.slots = [];
//     } else {
//       // TODO - destroy selective slots
//     }
//   display(div) {
//   openConsole() {}
//   disablePublisherConsole() {}
//   setAdIframeTitle(title) {
//     this._title = title;
//   _addService(service) {
//     this._services[service.getName()] = service;
//   _loaded() {
//     this.apiReady = true;
//     this.cmd = new CommandArray(this.cmd);
