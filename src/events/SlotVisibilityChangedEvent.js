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
    this.serviceName = serviceName;
    this.slot = slot;
    this.inViewPercentage = inViewPercentage;
  }

  get name() {
    return 'googletag.events.SlotVisibilityChangedEvent';
  }
}
