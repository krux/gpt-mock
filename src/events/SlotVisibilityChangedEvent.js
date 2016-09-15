/**
 * This event is fired whenever the on-screen percentage of an ad slot's area
 * changes. The event is throttled and will not fire more often than once every
 * 200ms.
 *
 * @typedef {Object} SlotVisibilityChangedEvent
 * @property {number} inViewPercentage The percentage (0-100) of the ad's area that is visible.
 * @property {string} serviceName Name of the service that owns the slot.
 * @property {!Slot} slot The slot whose visibility changed.
 */
