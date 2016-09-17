/**
 * This event is fired when the creative's iframe fires its load event. When
 * rendering rich media ads in sync rendering mode, no iframe is used so no
 * SlotOnLoadEvent will be fired.
 */
export default class SlotOnloadEvent {
  /**
   * Creates a new SlotOnloadEvent instance.
   *
   * @param {string} serviceName Name of the service that rendered the slot.
   * @param {!Slot} slot The slot in which the creative was loaded.
   */
  constructor(serviceName, slot) {
    this._serviceName = serviceName;
    this._slot = slot;
  }

  /**
   * Name of the event.
   *
   * @private
   * @type {string}
   */
  get _name() {
    return 'googletag.events.SlotOnloadEvent';
  }

  /**
   * Name of the service that rendered the slot.
   *
   * @type {string}
   */
  get serviceName() {
    return this._serviceName;
  }

  /**
   * The slot in which the creative was loaded.
   *
   * @type {!Slot}
   */
  get slot() {
    return this._slot;
  }
}
