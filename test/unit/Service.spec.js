import Service from '../../src/Service';
import GPT from '../../src/GPT';

describe('Service', () => {
  const gt = new GPT();

  describe('#constructor', () => {
    it('constructs', () => {
      const service = new Service(gt);
      expect(service).to.be.ok();
    });
  });
});

// TODO: Service
//   constructor(gt, name) {
//   getName() {
//   getVersion() {
//   getSlots() {
//   _addSlot(slot) {
//   getSlotIdMap() {
//     return Object.assign({}, this._slotIdMap);
//   addEventListener(eventType, listener) {
//     this._listeners[eventType] = this._listeners[eventType] || [];
//     this._listeners[eventType].push(listener);
//     return this;
//   get(key) {
//     return this._attributes[key] || null;
//   getAttributeKeys() {
//     return Object.keys(this._attributes);
//   set(key, value) {
//     this._attributes[key] = value;
//   display(adUnitPath, size, optDiv, optClickUrl) {
//     this._used = true;
//     this.enable();
//     this._gt.defineSlot(adUnitPath, size, optDiv).addService(this).setClickUrl(optClickUrl);
//   enable() {
//     if (this._used) {
//       this._enabled = true;
//       this._onEnable();
//     }
