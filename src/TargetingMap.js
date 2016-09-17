/**
 * Manages setting and retrieving targeting.
 *
 * @experimental
 */
export default class TargetingMap {
  /**
   * Creates a new {@link TargetingMap} instance.
   */
  constructor() {
    this._targeting = {};
  }

  /**
   * Sets custom targeting parameters for a given key.
   *
   * @param {string} key Targeting parameter key.
   * @param {string|!Array<string>} value Targeting parameter value or array of values.
   */
  set(key, value) {
    if (Array.isArray(value)) {
      this._targeting[key] = value;
    } else {
      this._targeting[key] = [value];
    }
  }

  /**
   * Returns a specific targeting parameter that has been set.
   *
   * @param {string} key The targeting key to look for.
   * @returns {!Array<string>} The values associated with this key, or an empty
   * array if there is no such key.
   */
  get(key) {
    return this._targeting[key] || [];
  }

  /**
   * Returns the list of all targeting keys that have been set.
   *
   * @returns {!Array<string>} Array of targeting keys. Ordering is undefined.
   */
  keys() {
    return Object.keys(this._targeting);
  }

  /**
   * Clears custom targeting parameters for a given key.
   *
   * @param {string} [key] Targeting parameter key.
   */
  clear(key) {
    if (key == null) {
      this._targeting = {};
    } else {
      delete this._targeting[key];
    }
  }

  /**
   * Returns the current targeting key-value dictionary.
   *
   * @returns {Object<string, Array<string>>} the targeting map.
   */
  all() {
    return Object.assign({}, this._targeting);
  }
}
