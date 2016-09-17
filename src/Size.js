/**
 * Size captures a two dimensional size.
 *
 * @experimental
 */
export default class Size {
  /**
   * Creates a new {@link Size} instance.
   *
   * @param {number} width The width
   * @param {number} height The height
   */
  constructor(width, height) {
    /**
     * The width
     * @type {number}
     */
    this.width = width;

    /**
     * The height
     * @type {number}
     */
    this.height = height;
  }

  /**
   * Gets the width in pixels.
   *
   * @type {number} The width in pixels
   */
  getWidth() {
    return this.width;
  }

  /**
   * Gets the height in pixels.
   *
   * @type {number} The height in pixels
   */
  getHeight() {
    return this.height;
  }

  /**
   * Returns whether the {@link Size} is empty.
   *
   * @experimental
   * @type {boolean} True if the size is empty.
   */
  isEmpty() {
    return !(this.width * this.height);
  }

  /**
   * Truncates the width and height upward.
   *
   * @experimental
   * @type {Size} The instance called
   */
  ceil() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  }

  /**
   * Truncates the width and height downard.
   *
   * @experimental
   * @type {Size} The instance called
   */
  floor() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  }

  /**
   * Rounds the width and height.
   *
   * @experimental
   * @type {Size} The instance called
   */
  round() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  }
}
