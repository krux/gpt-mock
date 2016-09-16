import ContentService from '../../src/ContentService';
import GPT from '../../src/GPT';

describe('ContentService', () => {
  const gt = new GPT();

  describe('#constructor', () => {
    it('constructs', () => {
      const service = new ContentService(gt);
      expect(service).to.be.ok();
    });
  });
});

// TODO ContentService
//   constructor(gt) {
//     this._storedContent = [];
//   _onEnable() {
//     for (let [slot, content] of this._storedContent) {
//       slot._setContent(content);
//     }
//     this._storedContent = null;
//  setContent(slot, content) {
//     if (this._enabled) {
//       slot._setContent(content);
//     } else {
//       this._storedContent.push([slot, content]);
//     }
//   }
