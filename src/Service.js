/**
 * Base service class that contains methods common for all services.
 */
export default class Service {
  /**
   * Creates a new {@link Service}.
   *
   * @param {GPT} gpt The containing {@link GPT} instance.
   * @param {string} name The name of the service
   */
  constructor(gpt, name) {
    this._name = name;
    this._gpt = gpt;
    this._enabled = false;
    this._used = false;
    this._listeners = {};
    this._attributes = {};
    this._slots = [];
    this._slotCounter = 0;
    this._slotIdMap = {};
  }

  /**
   * Returns the name of the service.
   *
   * @experimental
   * @returns {string} The name of the service
   */
  getName() {
    return this._name;
  }

  /**
   * Returns a version string.
   *
   * @experimental
   * @returns {string} The version string.
   */
  getVersion() {
    return 'unversioned';
  }

  /**
   * Returns the slots with this service enabled.
   *
   * @experimental
   * @returns {Array<Slot>} The slots
   */
  getSlots() {
    return this._slots.slice(0);
  }

  /**
   * Adds the given slot to this service.
   *
   * @param {Slot} slot The slot to add
   * @returns {Slot}
   * @private
   */
  _addSlot(slot) {
    if (this._slots.indexOf(slot) === -1) {
      this._gpt._addSlot(slot);

      this._slots.push(slot);
      this._slotCounter = this._slotCounter + 1;

      const id = `${slot.getAdUnitPath()}_${this._slotCounter}`;
      this._slotIdMap[id] = slot;
    }

    this._used = true;
    return slot;
  }

  /**
   * Removes the given slot from the service.
   *
   * @param {Slot} slot The slot to remove
   * @private
   */
  _removeSlot(slot) {
    const index = this._slots.indexOf(slot);
    if (index !== -1) {
      this._slots.splice(index, 1);
      this._gpt._removeSlot(slot);
      const id = `${slot.getAdUnitPath()}_${index + 1}`;
      delete this._slotIdMap[id];
    }
  }

  /**
   * Returns a map of IDs to slots.
   *
   * @experimental
   * @returns {Object} The map of IDs to slots.
   */
  getSlotIdMap() {
    return Object.assign({}, this._slotIdMap);
  }

  /**
   * Registers a listener that allows you to set up and call a JavaScript
   * function when a specific {@link GPT} event happens on the page. The following
   * events are supported:
   * * googletag.events.ImpressionViewableEvent
   * * googletag.events.SlotOnloadEvent
   * * googletag.events.SlotRenderEndedEvent
   * * googletag.events.SlotVisibilityChangedEvent
   *
   * An object of the appropriate event type is passed to the listener when it is called.
   *
   * @param {string} eventType A string representing the type of event generated
   * by GPT. Event types are case sensitive.
   * @param {function(event: Object)} listener Function that takes a single event object argument.
   * @returns {Service} The service object on which the method was called.
   */
  addEventListener(eventType, listener) {
    this._listeners[eventType] = this._listeners[eventType] || [];
    this._listeners[eventType].push(listener);
    return this;
  }

  /**
   * Fires the specified eventType, calling all registered listeners with the
   * specified event object.
   *
   * @param {string} eventType The event type to fire.
   * @param {Object} event The event object to pass to listeners.
   * @private
   */
  _fireEvent(eventType, event) {
    for (let listener of (this._listeners[eventType] || [])) {
      listener(event);
    }
  }

  /**
   * Returns the value for the AdSense attribute associated with the given key.
   *
   * @param {string} key Name of the attribute to look for.
   * @returns {?string} Current value for the attribute key, or null if the key
   * is not present
   */
  get(key) {
    return this._attributes[key] || null;
  }

  /**
   * Returns the attribute keys that have been set on this service.
   *
   * @returns {!Array<string>} Array of attribute keys set on this service.
   * Ordering is undefined.
   */
  getAttributeKeys() {
    return Object.keys(this._attributes);
  }

  /**
   * Sets values for AdSense attributes that apply to all ad slots under the
   * publisher ads service. See AdSense Attributes for a list of available keys
   * and values. Calling this more than once for the same key will override
   * previously set values for that key. All values must be set before the
   * first display call.
   *
   * @param {string} key The name of the attribute.
   * @param {string} value Attribute value.
   * @returns {Service} The service object on which the method was called.
   */
  set(key, value) {
    this._attributes[key] = value;
    return this;
  }

  /**
   * Constructs and displays an ad slot with the given ad unit path and size.
   * This method does not work with single request mode.
   *
   * @param {string} adUnitPath Ad unit path of slot to be rendered.
   * @param {GeneralSize} size Width and height of the slot.
   * @param {string} [optDiv] ID of the div containing the slot.
   * @param {string} [optClickUrl] The click URL to use on this slot.
   */
  display(adUnitPath, size, optDiv, optClickUrl) {
    this._used = true;
    this.enable();
    this._gpt.defineSlot(adUnitPath, size, optDiv).addService(this).setClickUrl(optClickUrl);
  }

  /**
   * Enables the service.
   *
   * @experimental
   */
  enable() {
    this._enabled = true;
  }
}
