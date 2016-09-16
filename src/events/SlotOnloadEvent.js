/**
 * This event is fired when the creative's iframe fires its load event. When
 * rendering rich media ads in sync rendering mode, no iframe is used so no
 * SlotOnLoadEvent will be fired.
 *
 * @typedef {Object} SlotOnloadEvent
 * @property {string} serviceName Name of the service that rendered the slot.
 * @property {!Slot} slot The slot in which the creative was loaded.
 */
