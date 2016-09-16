import SizeMappingBuilder from '../../src/SizeMappingBuilder';

describe('SizeMappingBuilder', () => {
  describe('#constructor', () => {
    it('constructs', () => {
      const builder = new SizeMappingBuilder();
      expect(builder).to.be.ok();
      expect(builder).to.have.property('_mappings');
      expect(builder._mappings).to.be.an('array');
      expect(builder._mappings).to.be.empty();
    });
  });

  describe('#addSize', () => {
    it('returns the builder', () => {
      const builder = new SizeMappingBuilder();
      const viewport = [1024, 768];
      const mappings = [768, 60];
      expect(builder.addSize(viewport, mappings)).to.be(builder);
    });

    it('adds a mapping', () => {
      const builder = new SizeMappingBuilder();
      const viewport = [1024, 768];
      const mappings = [768, 60];
      builder.addSize(viewport, mappings);
      expect(builder).to.have.property('_mappings');
      expect(builder._mappings).to.be.an('array');
      expect(builder._mappings).to.eql([
        [viewport, mappings]
      ]);
    });

    it('accumulates mappings', () => {
      const builder = new SizeMappingBuilder();
      const firstViewport = [1024, 768];
      const secondViewport = [1600, 1200];
      const firstMappings = [768, 60];
      const secondMappings = [[768, 60], [468, 60]];
      builder.addSize(firstViewport, firstMappings);
      builder.addSize(secondViewport, secondMappings);
      expect(builder).to.have.property('_mappings');
      expect(builder._mappings).to.be.an('array');
      expect(builder._mappings).to.eql([
        [firstViewport, firstMappings],
        [secondViewport, secondMappings]
      ]);
    });
  });

  describe('#build', () => {
    it('returns null if no addSize call', () => {
      const builder = new SizeMappingBuilder();
      expect(builder).to.be.ok();
      expect(builder.build()).to.be(null);
    });

    it('returns null is invalid mappings are detected', () => {
      const builder = new SizeMappingBuilder();
      builder.addSize([1024, 768], 'rubbish');
      expect(builder.build()).to.be(null);
    });

    it('returns sizeMapping if addSize called', () => {
      const builder = new SizeMappingBuilder();
      const viewport = [1024, 768];
      const mappings = [768, 60];
      builder.addSize(viewport, mappings);
      const mapping = builder.build();

      expect(mapping).to.be.ok();
      expect(mapping).to.be.an('array');
      expect(mapping).to.have.length(1);
      expect(mapping[0]).to.be.an('array');
      expect(mapping[0]).to.have.length(2);

      const [viewport1, mappings1] = mapping[0];
      expect(viewport1).to.be.an('array');
      expect(viewport1).to.eql(viewport);
      expect(mappings1).to.be.an('array');
      expect(mappings1).to.eql(mappings);
    });

    it('returns null if build called a second time', () => {
      const builder = new SizeMappingBuilder();
      const viewport = [1024, 768];
      const mappings = [768, 60];
      builder.addSize(viewport, mappings);
      const mapping1 = builder.build();
      const mapping2 = builder.build();
      expect(mapping1).to.be.ok();
      expect(mapping2).to.not.be.ok();
    });
  });
});
