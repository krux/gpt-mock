/**
 * This event is fired when an impression becomes viewable, according to the
 * Active View criteria.
 */
export default class ImpressionViewableEvent {
  /**
   * Constructs a new ImpressionViewableEvent instance.
   *
   * @param {string} serviceName Name of the service that rendered the slot.
   * @param {!Slot} slot The slot which contains the impression that became viewable.
   */
  constructor(serviceName, slot) {
    this._serviceName = serviceName;
    this._slot = slot;
  }

  get name() {
    return 'googletag.events.ImpressionViewableEvent';
  }

  /**
   * Name of the service that rendered the slot.
   *
   * @returns {string}
   */
  get serviceName() {
    return this._serviceName;
  }

  /**
   * The slot which contains the impression that became viewable.
   *
   * @returns {!Slot}
   */
  get slot() {
    return this._slot;
  }
}
