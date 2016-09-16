/**
 * Size is used internally in GPT and is not actually documented.
 */
export default class Size {
  /**
   * Creates a new Size instance.
   * @param {number} w The width
   * @param {number} h The height
   */
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }

  /**
   * Gets the width in pixels.
   *
   * @returns {number} The width in pixels
   */
  getWidth() {
    return this.w;
  }

  /**
   * Gets the height in pixels.
   *
   * @returns {number} The height in pixels
   */
  getHeight() {
    return this.h;
  }
}
