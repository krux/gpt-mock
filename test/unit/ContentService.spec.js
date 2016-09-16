import ContentService from '../../src/ContentService';
import GPT from '../../src/GPT';
import Slot from '../../src/Slot';

describe('ContentService', () => {
  const gt = new GPT();
  const adUnitPath = '/Test/123';
  const size = [728, 90];
  const content = 'TEST CONTENT';
  const content2 = 'TEST CONTENT 2';

  describe('#constructor', () => {
    it('constructs', () => {
      const service = new ContentService(gt);
      expect(service).to.be.ok();
      expect(service).to.have.property('_gt', gt);
      expect(service).to.have.property('_storedContent');
      expect(service._storedContent).to.be.an('array');
      expect(service._storedContent).to.be.empty();
    });
  });

  describe('#setContent', () => {
    it('returns undefined', () => {
      const service = new ContentService(gt);
      const slot = new Slot(adUnitPath, size).addService(service);
      expect(service.setContent(slot, content)).to.not.be.ok();
    });

    it('stores content if service is not enabled', () => {
      const service = new ContentService(gt);
      const slot = new Slot(adUnitPath, size).addService(service);
      service.setContent(slot, content);
      expect(slot._getContent()).to.not.be(content);
    });

    it('sets content immediately if service is enabled', () => {
      const service = new ContentService(gt);
      const slot = new Slot(adUnitPath, size).addService(service);
      service.enable();
      service.setContent(slot, content);
      expect(slot._getContent()).to.be(content);
    });

    it('overwrites previous content', () => {
      const service = new ContentService(gt);
      const slot = new Slot(adUnitPath, size).addService(service);
      service.enable();
      service.setContent(slot, content);
      expect(slot._getContent()).to.be(content);
      service.setContent(slot, content2);
      expect(slot._getContent()).to.be(content2);
    });
  });

  describe('#enable', () => {
    it('returns undefined', () => {
      const service = new ContentService(gt);
      expect(service.enable()).to.not.be.ok();
    });

    it('sets any stored content', () => {
      const service = new ContentService(gt);
      const slot = new Slot(adUnitPath, size).addService(service);
      service.setContent(slot, content);
      expect(slot._getContent()).to.not.be(content);
      service.enable();
      expect(slot._getContent()).to.be(content);
    });
  });
});
