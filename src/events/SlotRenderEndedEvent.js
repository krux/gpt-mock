/**
 * This event is fired when a slot on the page has finished rendering. The event
 * is fired by the service that rendered the slot. Example: To listen to
 * companion ads, add a listener to the companionAds service, not the pubads
 * service.
 */
export default class SlotRenderEndedEvent {
  /**
   * Creates a new SlotRenderEndedEvent instance.
   *
   * @param {string} serviceName Name of the service that rendered the slot.
   * @param {!Slot} slot The slot in which the creative was rendered.
   * @param {?number} creativeId Creative ID of the rendered ad. Value is null
   * for empty slots, backfill ads or creatives rendered by services other than pubads service.
   * @param {?number} lineItemId Line item ID of the rendered ad. Value is null
   * for empty slots, backfill ads or creatives rendered by services other than pubads service.
   * @param {boolean} isEmpty true if no ad was returned for the slot, false otherwise.
   * @param {SingleSize} size Indicates the pixel size of the rendered
   * creative. Example: [728, 90]. Value is null for empty ad slots.
   */
  constructor(serviceName, slot, creativeId, lineItemId, isEmpty, size) {
    this._serviceName = serviceName;
    this._slot = slot;
    this._creativeId = creativeId;
    this._isEmpty = isEmpty;
    this._lineItemId = lineItemId;
    this._size = size;
  }

  get name() {
    return 'googletag.events.SlotRenderEndedEvent';
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
   * The slot in which the creative was rendered.
   *
   * @returns {!Slot}
   */
  get slot() {
    return this._slot;
  }

  /**
   * Creative ID of the rendered ad. Value is null for empty slots, backfill ads
   * or creatives rendered by services other than pubads service.
   *
   * @returns {?number}
   */
  get creativeId() {
    return this._creativeId;
  }

  /**
   * true if no ad was returned for the slot, false otherwise.
   *
   * @returns {boolean}
   */
  get isEmpty() {
    return this._isEmpty;
  }

  /**
   * Line item ID of the rendered ad. Value is null for empty slots, backfill
   * ads or creatives rendered by services other than pubads service.
   *
   * @returns {?number}
   */
  get lineItemId() {
    return this._lineItemId;
  }

  /**
   * Indicates the pixel size of the rendered creative. Example: [728, 90].
   * Value is null for empty ad slots.
   *
   * @returns {SingleSize}
   */
  get size() {
    return this._size;
  }
}
