import GPT from '../../src/GPT';

describe('GPT', () => {
  describe('#constructor', () => {
    it('constructs', () => {
      const gpt = new GPT();
      expect(gpt).to.be.ok();
    });
  });

  describe('#getVersion', () => {
    it('returns current version', () => {
      const gpt = new GPT();
      expect(gpt.getVersion()).to.be('94');
    });
  });

  describe('#companionAds', () => {
    it('returns the service', () => {
      const gpt = new GPT();
      expect(gpt.companionAds()).to.be.ok();
      expect(gpt.companionAds().getName()).to.be('companion_ads');
    });
  });

  describe('#content', () => {
    it('returns the service', () => {
      const gpt = new GPT();
      expect(gpt.content()).to.be.ok();
      expect(gpt.content().getName()).to.be('content');
    });
  });

  describe('#pubads', () => {
    it('returns the service', () => {
      const gpt = new GPT();
      expect(gpt.pubads()).to.be.ok();
      expect(gpt.pubads().getName()).to.be('publisher_ads');
    });
  });

  describe('#enableServices', () => {
    it('returns undefined', () => {
      const gpt = new GPT();
      expect(gpt.enableServices()).to.be(undefined);
    });

    it('enables the services', () => {
      const gpt = new GPT();
      gpt.enableServices();
      expect(gpt.pubads()._enabled).to.be(true);
    });
  });

  describe('#sizeMapping', () => {
    it('returns a new builder', () => {
      const gpt = new GPT();
      const builder1 = gpt.sizeMapping();
      expect(builder1).to.be.ok();
      const builder2 = gpt.sizeMapping();
      expect(builder2).to.be.ok();
      expect(builder2).to.not.be(builder1);
    });
  });

  describe('#defineSlot', () => {
    const adUnitPath = '/Test/12345';
    const size = [728, 90];
    const optDiv = null;

    it('returns a slot', () => {
      const gpt = new GPT();
      const slot = gpt.defineSlot(adUnitPath, size, optDiv);
      expect(slot).to.be.ok();
      expect(slot.getAdUnitPath()).to.be(adUnitPath);
    });

    it('adds a slot to the list of slots', () => {
      const gpt = new GPT();
      expect(gpt._slots).to.be.an('array');
      expect(gpt._slots).to.be.empty();
      const slot = gpt.defineSlot(adUnitPath, size, optDiv);
      expect(slot).to.be.ok();
      expect(gpt._slots).to.have.length(1);
      expect(gpt._slots).to.eql([slot]);
    });
  });

  describe('#defineOutOfPageSlot', () => {
    const adUnitPath = '/Test/12345';
    const optDiv = null;

    it('returns a new slot', () => {
      const gpt = new GPT();
      const slot = gpt.defineOutOfPageSlot(adUnitPath, optDiv);
      expect(slot).to.be.ok();
      expect(slot.getAdUnitPath()).to.be(adUnitPath);
      expect(slot._outOfPage).to.be(true);
    });

    it('adds a slot to the list of slots', () => {
      const gpt = new GPT();
      expect(gpt._slots).to.be.an('array');
      expect(gpt._slots).to.be.empty();
      const slot = gpt.defineOutOfPageSlot(adUnitPath, optDiv);
      expect(slot).to.be.ok();
      expect(gpt._slots).to.have.length(1);
      expect(gpt._slots).to.eql([slot]);
    });
  });

  describe('#destroySlots', () => {
    const adUnitPath = '/Test/12345';
    const optDiv = null;

    it('returns true if no slots', () => {
      const gpt = new GPT();

      expect(gpt._slots).to.be.an('array');
      expect(gpt._slots).to.be.empty();
      expect(gpt.destroySlots()).to.be(true);
    });

    it('returns true if clearing all slots', () => {
      const gpt = new GPT();

      expect(gpt._slots).to.be.an('array');
      expect(gpt._slots).to.be.empty();
      const slot = gpt.defineOutOfPageSlot(adUnitPath, optDiv);
      expect(slot).to.be.ok();
      expect(gpt._slots).to.have.length(1);
      expect(gpt._slots).to.eql([slot]);

      expect(gpt.destroySlots()).to.be(true);

      expect(gpt._slots).to.be.empty();
    });

    it('returns true if clearing specific slot', () => {
      const gpt = new GPT();

      expect(gpt._slots).to.be.an('array');
      expect(gpt._slots).to.be.empty();
      const slot1 = gpt.defineOutOfPageSlot(adUnitPath, optDiv);
      const slot2 = gpt.defineOutOfPageSlot(adUnitPath, optDiv);
      expect(slot1).to.be.ok();
      expect(slot2).to.be.ok();
      expect(gpt._slots).to.have.length(2);
      expect(gpt._slots).to.eql([slot1, slot2]);

      expect(gpt.destroySlots([slot2])).to.be(true);

      expect(gpt._slots).to.be.eql([slot1]);
    });
  });

  describe('#display', () => {
    it('returns undefined', () => {
      const gpt = new GPT();
      expect(gpt.display('div')).to.be(undefined);
    });
  });

  describe('#openConsole', () => {
    it('returns undefined', () => {
      const gpt = new GPT();
      expect(gpt.openConsole()).to.be(undefined);
    });
  });

  describe('#disablePublisherConsole', () => {
    it('returns undefined', () => {
      const gpt = new GPT();
      expect(gpt.disablePublisherConsole()).to.be(undefined);
    });
  });

  describe('#setAdIframeTitle', () => {
    const title = 'Advertisement';
    it('returns undefined', () => {
      const gpt = new GPT();
      expect(gpt.setAdIframeTitle(title)).to.be(undefined);
    });

    it('saves the title', () => {
      const gpt = new GPT();
      gpt.setAdIframeTitle(title);
      expect(gpt._title).to.be(title);
    });
  });

  describe('#_loaded', () => {
    it('returns undefined', () => {
      const gpt = new GPT();
      expect(gpt._loaded()).to.be(undefined);
    });

    it('sets apiReady flag', () => {
      const gpt = new GPT();
      expect(gpt.apiReady).to.be(undefined);
      expect(gpt._loaded()).to.be(undefined);
      expect(gpt.apiReady).to.be(true);
    });

    it('replaces cmd with CommandArray', () => {
      const gpt = new GPT();
      expect(gpt.cmd).to.be.an('array');
      expect(gpt._loaded()).to.be(undefined);
      expect(gpt.cmd).to.be.an('object');
    });
  });

});
