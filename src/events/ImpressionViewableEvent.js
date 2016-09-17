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

  /**
   * Name of the event.
   *
   * @private
   * @type {string}
   */
  get _name() {
    return 'googletag.events.ImpressionViewableEvent';
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
}
