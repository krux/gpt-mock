/**
 * This event is fired when a slot on the page has finished rendering. The event
 * is fired by the service that rendered the slot. Example: To listen to
 * companion ads, add a listener to the companionAds service, not the pubads
 * service.
 *
 * @typedef {Object} SlotRenderEndedEvent
 * @property {?number} creativeId Creative ID of the rendered ad. Value is null
 * for empty slots, backfill ads or creatives rendered by services other than pubads service.
 * @property {boolean} isEmpty true if no ad was returned for the slot, false otherwise.
 * @property {?number} lineItemId Line item ID of the rendered ad. Value is null
 * for empty slots, backfill ads or creatives rendered by services other than pubads service.
 * @property {string} serviceName Name of the service that rendered the slot.
 * @property {Array<number>|string} size Indicates the pixel size of the rendered
 * creative. Example: [728, 90]. Value is null for empty ad slots.
 * @property {!Slot} slot The slot in which the creative was rendered.
 */
