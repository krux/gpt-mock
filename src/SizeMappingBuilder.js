import * as SizeMappingArray from './SizeMappingArray';

/**
 * Builder for size mapping specification objects. This builder is provided to
 * help easily construct size specifications.
 */
export default class SizeMappingBuilder {
  /**
   * Creates a new SizeMappingBuilder.
   */
  constructor() {
    this._mappings = [];
  }

  /**
   * Adds a mapping from a single-size array representing the viewport to either
   * a single-size array or a multi-size array representing the slot.
   *
   * @param {SingleSizeArray} viewportSize The size of the viewport for this mapping entry.
   * @param {GeneralSize} slotSize The sizes of the slot for this mapping entry.
   * @returns {SizeMappingBuilder} A reference to this builder.
   */
  addSize(viewportSize, slotSize) {
    this._mappings.push([viewportSize, slotSize]);
    return this;
  }

  /**
   * Builds a size map specification from the mappings added to this builder. If
   * any invalid mappings have been supplied, this method will return null.
   * Otherwise it returns a specification in the correct format to pass to
   * {@link Slot#defineSizeMapping()}. The behavior of the builder after
   * calling {@link build()} is undefined.
   *
   * @returns {?SizeMappingArray} The result built by this builder. Can be null
   * if invalid size mappings were supplied.
   */
  build() {
    if (this._mappings.length > 0 &&
      SizeMappingArray.isSizeMappingArray(this._mappings)) {
      const mappings = this._mappings;
      this._mappings = [];
      return mappings;
    } else {
      return null;
    }
  }
}
