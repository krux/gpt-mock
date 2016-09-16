import SafeFrameConfig from '../../src/SafeFrameConfig';

describe('SafeFrameConfig', () => {
  describe('#constructor', () => {
    it('constructs and sets readonly properties', () => {
      const allowOverlayExpansion = true;
      const allowPushExpansion = true;
      const sandbox = true;
      const config = new SafeFrameConfig(allowOverlayExpansion, allowPushExpansion, sandbox);
      expect(config).to.be.ok();
      expect(config).to.have.property('allowOverlayExpansion', allowOverlayExpansion);
      expect(config).to.have.property('allowPushExpansion', allowPushExpansion);
      expect(config).to.have.property('sandbox', sandbox);
      expect(() => { config.allowOverlayExpansion = false; }).to.throwError();
      expect(() => { config.allowPushExpansion = false; }).to.throwError();
      expect(() => { config.sandbox = false; }).to.throwError();
    });
  });
});
