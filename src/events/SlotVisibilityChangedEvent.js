/**
 * This event is fired whenever the on-screen percentage of an ad slot's area
 * changes. The event is throttled and will not fire more often than once every
 * 200ms.
 */
export default class SlotVisibilityChangedEvent {
  /**
   * Creates a new SlotVisibilityChangedEvent instance.
   *
   * @param {string} serviceName Name of the service that owns the slot.
   * @param {!Slot} slot The slot whose visibility changed.
   * @param {number} inViewPercentage The percentage (0-100) of the ad's area that is visible.
   */
  constructor(serviceName, slot, inViewPercentage) {
    this._serviceName = serviceName;
    this._slot = slot;
    this._inViewPercentage = inViewPercentage;
  }

  /**
   * Name of the event.
   *
   * @private
   * @type {string}
   */
  get _name() {
    return 'googletag.events.SlotVisibilityChangedEvent';
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
   * The slot which contains the impression that became viewable.
   *
   * @type {!Slot}
   */
  get slot() {
    return this._slot;
  }

  /**
   * The percentage of the ad that is "in view".
   *
   * @type {number}
   */
  get inViewPercentage() {
    return this._inViewPercentage;
  }
}
