import TargetingMap from '../../src/TargetingMap';

/** @test {TargetingMap} */
describe('TargetingMap', () => {
  /** @test {TargetingMap#get} */
  describe('#get', () => {
    it('returns empty array if not set', () => {
      const map = new TargetingMap();
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.be.empty();
    });

    it('returns the value (as an array) if set', () => {
      const map = new TargetingMap();
      map.set('kv1', 'value');
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value']);
    });
  });

  /** @test {TargetingMap#keys} */
  describe('#keys', () => {
    it('returns empty array if no keys', () => {
      const map = new TargetingMap();
      expect(map.keys()).to.be.an('array');
      expect(map.keys()).to.be.empty();
    });

    it('returns array of keys', () => {
      const map = new TargetingMap();
      map.set('kv1', 'value1');
      map.set('kv2', 'value2');
      expect(map.keys()).to.be.an('array');
      expect(map.keys()).to.eql(['kv1', 'kv2']);
    });
  });

  /** @test {TargetingMap#all} */
  describe('all', () => {
    it('returns the targeting map', () => {
      const map = new TargetingMap();
      map.set('kv1', 'value1');
      map.set('kv2', 'value2');
      expect(map.all()).to.be.an('object');
      expect(map.all()).to.eql({
        kv1: ['value1'],
        kv2: ['value2']
      });
    });
  });

  /** @test {TargetingMap#set} */
  describe('#set', () => {
    it('saves the value', () => {
      const map = new TargetingMap();
      map.set('kv1', 'value');
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value']);
    });

    it('saves the array value', () => {
      const map = new TargetingMap();
      map.set('kv1', ['value']);
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value']);
    });

    it('overwrites the previous value', () => {
      const map = new TargetingMap();
      map.set('kv1', 'value1');
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value1']);
      map.set('kv1', 'value2');
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value2']);
    });
  });

  /** @test {TargetingMap#clear} */
  describe('#clear', () => {
    it('clears all targeting', () => {
      const map = new TargetingMap();
      map.set('kv1', 'value1');
      map.set('kv2', 'value2');
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value1']);
      expect(map.get('kv2')).to.be.an('array');
      expect(map.get('kv2')).to.eql(['value2']);
      map.clear();
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.empty();
      expect(map.get('kv2')).to.be.an('array');
      expect(map.get('kv2')).to.empty();
    });

    it('clears specific targeting', () => {
      const map = new TargetingMap();
      map.set('kv1', 'value1');
      map.set('kv2', 'value2');
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value1']);
      expect(map.get('kv2')).to.be.an('array');
      expect(map.get('kv2')).to.eql(['value2']);
      map.clear('kv2');
      expect(map.get('kv1')).to.be.an('array');
      expect(map.get('kv1')).to.eql(['value1']);
      expect(map.get('kv2')).to.be.an('array');
      expect(map.get('kv2')).to.empty();
    });
  });
});
