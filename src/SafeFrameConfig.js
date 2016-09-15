/**
 * Configuration object for SafeFrame containers.
 */
export default class SafeFrameConfig {
  /**
   * Creates a new SafeFrameConfig
   *
   * @param {boolean} allowOverlayExpansion true to allow expansion by overlay and false otherwise.
   * @param {boolean} allowPushExpansion true to allow expansion by push and false otherwise.
   * @param {boolean} sandbox true if SafeFrame should use the HTML5 sandbox
   * attribute to prevent top level navigation.
   */
  constructor(allowOverlayExpansion, allowPushExpansion, sandbox) {
    this._allowOverlayExpansion = allowOverlayExpansion;
    this._allowPushExpansion = allowPushExpansion;
    this._sandbox = sandbox;
  }

  /**
   * true to allow expansion by overlay and false otherwise.
   *
   * @returns {boolean}
   */
  get allowOverlayExpansion() {
    return this._allowOverlayExpansion;
  }

  /**
   * true to allow expansion by push and false otherwise.
   *
   * @returns {boolean}
   */
  get allowPushExpansion() {
    return this._allowPushExpansion;
  }

  /**
   * true if SafeFrame should use the HTML5 sandbox
   * attribute to prevent top level navigation. The only valid value is true (cannot
   * be forced to false). Note that the sandbox attribute disables plugins (e.g. Flash)
   * and creatives that attempt to navigate the top level page instead of opening
   * in a new window.
   *
   * @returns {boolean} boolean
   */
  get sandbox() {
    return this._sandbox;
  }
}
