/**
 * The SlotId collects several identifiers for a Slot.
 *
 * @experimental
 */
export default class SlotId {
  /**
   * Creates a new {@link SlotId} instance.
   *
   * @param {string} adUnitPath The ad unit path of the slot.
   * @param {number} instance The instance number of the slot.
   * @param {?string} [optDomId] The DOM ID of the slot.
   */
  constructor(adUnitPath, instance, optDomId) {
    this._adUnitPath = adUnitPath;
    this._instance = instance;
    this._domId = optDomId || `gpt_unit_${adUnitPath}_${instance}`;
  }

  /**
   * The name of the {@link Slot}.
   *
   * @returns {string} The name of the {@link Slot}.
   */
  getName() {
    return this._adUnitPath;
  }

  /**
   * The AdUnitPath of the {@link Slot}.
   *
   * @returns {string} The AdUnitPath of the {@link Slot}.
   */
  getAdUnitPath() {
    return this._adUnitPath;
  }

  /**
   * The DOM Id of the {@link Slot}.
   *
   * @returns {string} The DOM Id of the {@link Slot}.
   */
  getDomId() {
    return this._domId;
  }

  /**
   * The ID of the {@link Slot}.
   *
   * @returns {string} The ID of the {@link Slot}.
   */
  getId() {
    return `${this._adUnitPath}_${this._instance}`;
  }

  /**
   * The instance number of the {@link Slot}.
   *
   * @returns {number} The instance number of the {@link Slot}.
   */
  getInstance() {
    return this._instance;
  }

  /**
   * Converts the {@link SlotId} to a String.
   *
   * @override
   * @returns {string} A String representation.
   */
  toString() {
    return this.getId();
  }
}
