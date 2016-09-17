import ResponseInformation from '../../src/ResponseInformation';

/** @test {ResponseInformation} */
describe('ResponseInformation', () => {
  /** @test {ResponseInformation#constructor} */
  describe('#constructor', () => {
    it('constructs and properties are readonly', () => {
      const advertiserId = 'adv';
      const campaignId = 'camp';
      const lineItemId = 123;
      const creativeId = 456;
      const labelIds = ['label1', 'label2'];
      const info = new ResponseInformation(advertiserId, campaignId, lineItemId,
        creativeId, labelIds);
      expect(info).to.be.ok();
      expect(info).to.have.property('advertiserId', advertiserId);
      expect(info).to.have.property('campaignId', campaignId);
      expect(info).to.have.property('lineItemId', lineItemId);
      expect(info).to.have.property('creativeId', creativeId);
      expect(info).to.have.property('labelIds', labelIds);

      expect(() => { info.advertiserId = 'cannot'; }).to.throwError();
      expect(() => { info.campaignId = 'cannot'; }).to.throwError();
      expect(() => { info.lineItemId = 0; }).to.throwError();
      expect(() => { info.creativeId = 0; }).to.throwError();
      expect(() => { info.labelIds = []; }).to.throwError();
    });
  });
});
