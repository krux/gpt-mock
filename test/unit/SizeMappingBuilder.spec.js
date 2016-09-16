import SizeMappingBuilder from '../../src/SizeMappingBuilder';

describe('SizeMappingBuilder', () => {
  describe('#constructor', () => {
    it('constructs', () => {
      const builder = new SizeMappingBuilder();
      expect(builder).to.be.ok();
      expect(builder).to.have.property('_mappings', null);
    });
  });

  describe('#addSize', () => {
    it('adds a mapping', () => {
      const builder = new SizeMappingBuilder();
      builder.addSize([1024, 768], [[768, 60]]);
      expect(builder).to.have.property('_mappings');
      expect(builder._mappings).to.eql([
        [[1024, 768], [[768, 60]]]
      ]);
    });

    it('accumulates mappings', () => {
      const builder = new SizeMappingBuilder();
      builder.addSize([1024, 768], [[768, 60]]);
      builder.addSize([1600, 1200], [[768, 60], [468, 60]]);
      expect(builder).to.have.property('_mappings');
      expect(builder._mappings).to.eql([
        [[1024, 768], [[768, 60]]],
        [[1600, 1200], [[768, 60], [468, 60]]]
      ]);
    });
  });

  describe('#build', () => {
    it('returns null if no addSize call', () => {
      const builder = new SizeMappingBuilder();
      expect(builder).to.be.ok();
      expect(builder.build()).to.be(null);
    });

    it('returns sizeMapping if addSize called', () => {
      const builder = new SizeMappingBuilder();
      builder.addSize([1024, 768], [[768, 60]]);
      const mapping1 = builder.build();

      expect(mapping1).to.be.ok();
      expect(mapping1.length).to.be(1);
      expect(mapping1[0].length).to.be(2);
      expect(mapping1[0][0]).to.eql([1024, 768]);
      expect(mapping1[0][1]).to.eql([[768, 60]]);
    });


    it('returns null if build called a second time', () => {
      const builder = new SizeMappingBuilder();
      builder.addSize([1024, 768], [[768, 60]]);
      const mapping1 = builder.build();
      const mapping2 = builder.build();
      expect(mapping1).to.be.ok();
      expect(mapping2).to.not.be.ok();
    });
  });
});

// TODO: SizeMappingBuilder
//   addSize(viewportSize, slotSize) {
//     if (this._mappings == null) {
//       this._mappings = [];
//     }
//
//     this._mappings.push([viewportSize, slotSize]);
