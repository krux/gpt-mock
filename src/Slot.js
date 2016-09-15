/**
 * Slot is an object representing single ad slot on a page.
 */
export default class Slot {
  /**
   * Creates a new Slot.
   *
   * @param {string} adUnitPath Full path of the ad unit with the network code and unit code.
   * @param {GeneralSize=} size Width and height of the added slot. This is the
   * size that is used in the ad request if no responsive size mapping is provided
   * or the size of the viewport is smaller than the smallest size provided in the mapping.
   * @param {string=} optDiv ID of the div that will contain this ad unit.
   */
  constructor(adUnitPath, size, optDiv) {
    this._adUnitPath = adUnitPath;
    this._slotElementId = optDiv;
    this._size = size;
    this._services = [];
    this._categoryExclusions = [];
    this._targeting = {};
    this._attributes = {};
    this._clickUrl = null;
    this._responseInformation = null;
    this._sizeMapping = null;
    this._options = {
      content: null,
      refreshed: 0,
      displayed: false,
      fetched: false,
      passback: false,
      outOfPage: false,
      forceSafeFrame: false,
      safeFrameConfig: null,
      collapseEmptyDiv: false,
      collapseBeforeAdFetch: false
    };
  }

  /**
   * Returns the full path of the ad unit, with the network code and ad unit path.
   *
   * @returns {string} Ad unit path.
   */
  getAdUnitPath() {
    return this._adUnitPath;
  }

  /**
   * Returns the id of the slot element provided when the slot was defined.
   *
   * @returns {string} Slot element id.
   */
  getSlotElementId() {
    return this._slotElementId;
  }

  /**
   * UNDOCUMENTED - returns the enabled services.
   *
   * @returns {Array<Service>} The list of enabled services.
   */
  getServices() {
    return this._services;
  }

  /**
   * UNDOCUMENTED - returns the sizes.
   *
   * @returns {GeneralSize|*}
   */
  getSizes() {
    return this._size; // TODO
  }

  /**
   * UNDOCUMENTED - returns a flag indicating whether the slot is out of the page.
   *
   * @returns {boolean}
   */
  getOutOfPage() {
    return this._options.outOfPage;
  }

  /**
   * Initiates rendering of this slot.
   */
  display() {
    this._options.displayed = true;
  }

  /**
   * Returns the list of attribute keys set on this slot. If you intend to see
   * the keys of service-level attributes inherited by this slot, you have to
   * use the PubAdsService.getAttributeKeys() API.
   *
   * @returns {!Array<string>} Array of attribute keys. Ordering is undefined.
   */
  getAttributeKeys() {
    return Object.keys(this._attributes);
  }

  /**
   * Returns the value for the AdSense attribute associated with the given key.
   * Note that if you intend to see service-level attributes inherited by this
   * slot, you have to use the PubAdsService.get(key) API.
   *
   * @param {string} key Name of the attribute to look for.
   * @returns {?string} Current value for the attribute key, or null if the key
   * is not present.
   */
  get(key) {
    return this._attributes[key] || null;
  }

  /**
   * Sets a value for an AdSense attribute on a particular ad slot. This will
   * override any values set at the service level for this key. See the AdSense
   * Attributes for a list of available keys and values. Calling this method
   * more than once for the same key will override previously set values for
   * that key. All values must be set before any display call.
   *
   * @param {string} key The name of the attribute.
   * @param {string} value Attribute value.
   * @returns {Slot} The slot object on which the method was called.
   */
  set(key, value) {
    this._attributes[key] = value;
    return this;
  }

  _getAttributes() {
    return this._attributes;
  }

  /**
   * Returns a specific custom targeting parameter set on this slot.
   * Service-level targeting parameters are not included.
   *
   * @param {string} key The targeting key to look for.
   * @returns {!Array<string>} The values associated with this key, or an empty
   * array if there is no such key.
   */
  getTargeting(key) {
    return this._targeting[key] || [];
  }

  /**
   * Returns the list of all custom targeting keys set on this slot. Service-level
   * targeting keys are not included.
   *
   * @returns {!Array<string>} Array of targeting keys. Ordering is undefined.
   */
  getTargetingKeys() {
    return Object.keys(this._targeting);
  }

  /**
   * Sets a custom targeting parameter for this slot. Calling this method
   * multiple times for the same key will overwrite old values. Values set here
   * will overwrite targeting parameters set on service level. These keys are
   * defined in your DFP account.
   *
   * @param {string} key Targeting parameter key.
   * @param {string|!Array<string>} value Targeting parameter value or array of values.
   * @returns {Slot} The slot object on which the method was called.
   */
  setTargeting(key, value) {
    if (Array.isArray(value)) {
      this._targeting[key] = value;
    } else {
      this._targeting[key] = [value];
    }
    return this;
  }

  /**
   * Sets custom targeting parameters for this passback slot, from a key:value
   * map in a JSON object. A badly formatted input will be rejected. This is the
   * same as calling @{link #setTargeting} for all the key values
   * of the object. In case of overwriting, only the last value will be kept.
   * Values set here will overwrite targeting parameters set on service level.
   * These keys are defined in your DFP account.
   *
   * @param {Object<string,string|!Array<string>>} map Targeting parameter key:value map.
   * @returns {Slot} The slot object on which the method was called.
   */
  updateTargetingFromMap(map) {
    for (let key in map) {
      if (map.hasOwnProperty(key)) {
        this.setTargeting(key, map[key]);
      }
    }
    return this;
  }

  /**
   * Clears all custom slot-level targeting parameters for this slot.
   *
   * @returns {Slot} The slot object on which the method was called.
   */
  clearTargeting() {
    this._targeting = {};
    return this;
  }

  _getTargetingMap() {
    return this._targeting;
  }

  /**
   * Adds a service to this slot.
   *
   * @param {Service} service The service to be added.
   * @returns {Slot} The slot object on which the method was called.
   */
  addService(service) {
    this._services.push(service);
    service._addSlot(this);
    return this;
  }

  _hasService(service) {
    return this._services.indexOf(service) !== -1;
  }

  /**
   * Returns the ad category exclusion labels for this slot.
   *
   * @returns {!Array<string>} The ad category exclusion labels for this slot.
   */
  getCategoryExclusions() {
    return this._categoryExclusions;
  }

  /**
   * Sets a slot-level ad category exclusion label on this slot.
   *
   * @param {string} categoryExclusion The ad category exclusion label to add.
   * @returns {Slot} The slot object on which the method was called.
   */
  setCategoryExclusion(categoryExclusion) {
    this._categoryExclusions.push(categoryExclusion);
    return this;
  }

  /**
   * Clears all slot-level ad category exclusion labels for this slot.
   *
   * @returns {Slot} The slot object on which the method was called.
   */
  clearCategoryExclusions() {
    this._categoryExclusions = [];
    return this;
  }

  /**
   * Sets an array of mappings from a minimum viewport size to slot size for this slot.
   *
   * @param {!SizeMappingArray} sizeMapping Array of size mappings. You can use
   * SizeMappingBuilder to create it. Each size mapping is an array of two elements:
   * SingleSizeArray and GeneralSize.
   * @returns {Slot} The slot object on which the method was called.
   */
  defineSizeMapping(sizeMapping) {
    this._sizeMapping = sizeMapping;
    return this;
  }

  _getSizeMapping() {
    return this._sizeMapping;
  }

  /**
   * Sets the click URL to which users will be redirected after clicking on the
   * ad. The DFP servers still record a click even if the click URL is replaced,
   * but any landing page URL associated with the creative that is served is
   * overridden. Subsequent calls overwrite the value. This works only for
   * non-SRA requests
   *
   * @param {string} value The click URL to set.
   * @returns {Slot} The slot object on which the method was called.
   */
  setClickUrl(value) {
    this._clickUrl = value;
    return this;
  }

  /**
   * UNDOCUMENTED - gets the click URL.
   *
   * @returns {?string} The click URL
   */
  getClickUrl() {
    return this._clickUrl;
  }

  /**
   * Returns the ad response information. This is based on the last ad response
   * for the slot. If this is called when the slot has no ad, null will be
   * returned.
   *
   * @returns {?ResponseInformation}
   */
  getResponseInformation() {
    return this._responseInformation;
  }

  _setResponseInformation(responseInformation) {
    this._responseInformation = responseInformation;
    return this;
  }

  /**
   * Sets whether the slot div should be hidden when there is no ad in the slot.
   * This overrides the service-level settings.
   *
   * @param {boolean} collapse Whether to collapse the slot if no ad is returned.
   * @param {boolean=} optCollapseBeforeAdFetch Whether to collapse the slot
   * even before an ad is fetched. Ignored if collapse is not true.
   * @returns {Slot} The slot object on which the method was called.
   */
  setCollapseEmptyDiv(collapse, optCollapseBeforeAdFetch) {
    this._options.collapseEmptyDiv = collapse;
    if (collapse) {
      this._options.collapseBeforeAdFetch = optCollapseBeforeAdFetch;
    }
    return this;
  }

  /**
   * Configures whether ads in this slot should be forced to be rendered using
   * a SafeFrame container
   *
   * @param {boolean} forceSafeFrame true to force all ads in this slot to be
   * rendered in SafeFrames and false to opt-out of a page-level setting (if
   * present). Setting this to false when not specified at page-level, won't
   * change anything.
   * @returns {Slot} The slot object on which the method was called.
   */
  setForceSafeFrame(forceSafeFrame) {
    this._options.forceSafeFrame = forceSafeFrame;
    return this;
  }

  /**
   * Sets the slot-level preferences for SafeFrame configuration. Any unrecognized
   * keys in the config object will be ignored. The entire config will be ignored
   * if an invalid value is passed for a recognized key. These slot level
   * preferences, if specified, will override any page level preferences.
   *
   * @param {SafeFrameConfig} config The configuration object.
   * @returns {Slot} The slot object on which the method was called.
   */
  setSafeFrameConfig(config) {
    this._options.safeFrameConfig = config;
    return this;
  }

  _refresh() {
    this._options.refreshed += 1;
    this._options.fetched = true;
  }

  _clear() {
    this._options.content = null;
    this._options.fetched = null;
  }

  _setContent(content) {
    this._options.content = content;
  }
}
