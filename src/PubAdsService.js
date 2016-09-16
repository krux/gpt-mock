import Service from './Service';
import Slot from './Slot';

/**
 * Publisher Ads service. This service is used to fetch and show ads from your DFP account.
 */
export default class PubAdsService extends Service {
  /**
   * Creates a new PubAdsService.
   *
   * @param {GPT} gt The containing GPT instance.
   */
  constructor(gt) {
    super(gt, PubAdsService._name);
    this._categoryExclusions = [];
    this._targeting = {};
    this._options = {
      collapseEmptyDivs: false,
      collapseBeforeAdFetch: false,
      initialLoad: true,
      asyncRendering: false,
      singleRequest: false,
      syncRendering: false,
      videoAds: false,
      centerAds: false,
      forceSafeFrame: false,
      cookieOptions: null,
      ppid: null,
      videoContentId: null,
      videoCmsId: null,
      safeFrameConfig: null,
      tagForChildDirectedTreatment: null
    };
  }

  static get _name() {
    return 'publisher_ads';
  }

  _onEnable() {
    this._gt.pubadsReady = true;
  }

  /**
   * Fetches and displays new ads for specific or all slots on the page.
   * Works only in asynchronous rendering mode.
   *
   * For proper behavior across all browsers, calling refresh must be preceded
   * by a call to display the ad slot. If the call to display is omitted, refresh
   * may behave unexpectedly. If desired, the disableInitialLoad method can be
   * used to stop display from fetching an ad.
   *
   * @param {Array<!Slot>=} optSlots The slots to refresh. Array is optional;
   * all slots will be refreshed if it is unspecified.
   * @param {{changeCorrelator: boolean}=} optOptions Configuration options
   * associated with this refresh call. changeCorrelator specifies whether or
   * not a new correlator is to be generated for fetching ads. Our ad servers
   * maintain this correlator value briefly (currently for 30 seconds, but
   * subject to change), such that requests with the same correlator received
   * close together will be considered a single page view. By default a new
   * correlator is generated for every refresh.
   */
  refresh(optSlots, optOptions) {
    let slots = this._gt._slots;
    if (optSlots == null) {
      slots = optSlots;
    }
    for (let slot of slots) {
      slot._refresh();
    }
    if (optOptions && optOptions.changeCorrelator) {
      // TODO - change correlator
    }
  }

  /**
   * Removes the ads from the given slots and replaces them with blank
   * content. The slots will be marked as unfetched.
   *
   * @param {Array<!Slot>=} optSlots The array of slots to clear. Array is
   * optional; all slots will be cleared if it is unspecified.
   * @returns {boolean} Returns true if slots have been cleared, false otherwise.
   */
  clear(optSlots) {
    let slots = this._gt._slots;
    if (optSlots == null) {
      slots = optSlots;
    }
    for (let slot of slots) {
      slot._clear();
    }

    return true;
  }

  /**
   * Constructs an out-of-page passback slot. A passback is where a GPT snippet
   * is used as a creative in an ad serving system. The ad serving system could
   * be DFP or a third party. In this case, the ads are always requested
   * synchronously in non-single request mode.
   *
   * @param {string} adUnitPath The ad unit path of the slot to use as a passback.
   * @returns {?Slot} The new passback object or null if the method was
   * called with invalid arguments.
   */
  defineOutOfPagePassback(adUnitPath) {
    if (adUnitPath != null) {
      const slot = new Slot(adUnitPath).addService(this);
      slot._passback = true;
      slot._outOfPage = true;
      return this._addSlot(slot);
    } else {
      return null;
    }
  }

  /**
   * Constructs a passback slot. A passback is where a GPT snippet is used as a
   * creative in an ad serving system. The ad serving system could be DFP or a
   * third party. In this case, the ads are always requested synchronously in
   * non-single request mode.
   *
   * @param {string} adUnitPath The ad unit path of the slot to use as a passback.
   * @param {GeneralSize} size The size of the slot.
   * @returns {?Slot} The new passback object or null if the method was
   * called with invalid arguments.
   */
  definePassback(adUnitPath, size) {
    if (adUnitPath != null && size != null) {
      const slot = new Slot(adUnitPath, size).addService(this);
      slot._passback = true;
      return this._addSlot(slot);
    } else {
      return null;
    }
  }

  /**
   * Disables requests for ads on page load, but allows ads to be requested with
   * a GPT#pubads().refresh() call. This should be set prior to enabling
   * the service. Async mode must be used; otherwise it will be impossible to
   * request ads using `refresh`.
   */
  disableInitialLoad() {
    this._options.initialLoad = false;
  }

  /**
   * Enables async rendering mode to enable non-blocking fetching and rendering
   * of ads. Because the service uses asynchronous rendering by default, you
   * only need to use this method to override a previous setting. Async mode
   * must be set before the service is enabled.
   *
   * @returns {boolean} Returns true if async rendering mode was enabled and
   * false if it is impossible to enable async rendering mode because the method
   * was called after the service was enabled.
   */
  enableAsyncRendering() {
    this._options.asyncRendering = true;
    return true;
  }

  /**
   * Enables single request mode for fetching multiple ads at the same time.
   * This requires all pubads slots to be defined and added to the pubads
   * service prior to enabling the service. Single request mode must be set
   * before the service is enabled.
   *
   * @returns {boolean} Returns true if single request mode was enabled and false
   * if it is impossible to enable single request mode because the method was
   * called after the service was enabled.
   */
  enableSingleRequest() {
    this._options.singleRequest = true;
    return true;
  }

  /**
   * Enables sync rendering mode to enable blocking fetching and rendering of ads.
   * This mode must be set before the service is enabled. Synchronous rendering
   * also requires that the GPT JavaScript be loaded synchronously.
   *
   * @returns {boolean} Returns true if sync rendering mode was enabled and false
   * if it is impossible to enable sync rendering mode because the method was
   * called after the service was enabled.
   */
  enableSyncRendering() {
    this._options.syncRendering = true;
    return true;
  }

  /**
   * Signals to GPT that video ads will be present on the page. This enables
   * competitive exclusion constraints on display and video ads. If the video
   * content is known, call setVideoContent in order to be able to use content
   * exclusion for display ads.
   */
  enableVideoAds() {
    this._options.videoAds = true;
  }

  /**
   * Sets custom targeting parameters for a given key that apply to all pubads
   * service ad slots. Calling this multiple times for the same key will
   * overwrite old values. These keys are defined in your DFP account.
   *
   * @param {string} key Targeting parameter key.
   * @param {string|!Array<string>} value Targeting parameter value or array of values.
   * @returns {PubAdsService} The service object on which the method was called.
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
   * Returns a specific custom service-level targeting parameter that has been set.
   *
   * @param {string} key The targeting key to look for.
   * @returns {!Array<string>} The values associated with this key, or an empty
   * array if there is no such key.
   */
  getTargeting(key) {
    return this._targeting[key] || [];
  }

  /**
   * Returns the list of all custom service-level targeting keys that have been set.
   *
   * @returns {!Array<string>} Array of targeting keys. Ordering is undefined.
   */
  getTargetingKeys() {
    return Object.keys(this._targeting);
  }

  /**
   * Clears custom targeting parameters for a given key.
   *
   * @param {string} key Targeting parameter key.
   * @returns {PubAdsService} The service object on which the method was called.
   */
  clearTargeting(key) {
    delete this._targeting[key];
    return this;
  }

  /**
   * Enables collapsing of slot divs so that they don't take up any space on the
   * page when there is no ad content to display. This mode must be set before
   * the service is enabled.
   *
   * @param {boolean=} optCollapseBeforeAdFetch Whether to collapse the slots
   * even before the ads are fetched. This parameter is optional; if not
   * provided, false will be used as the default value.
   * @returns {boolean} Returns true if div collapse mode was enabled and false
   * if it is impossible to enable collapse mode because the method was called
   * after the service was enabled.
   */
  collapseEmptyDivs(optCollapseBeforeAdFetch) {
    this._options.collapseEmptyDivs = true;
    this._options.collapseBeforeAdFetch = optCollapseBeforeAdFetch;
    return true; // TODO - see return comment
  }

  /**
   * Sets a page-level ad category exclusion for the given label name.
   *
   * @param {string} categoryExclusion The ad category exclusion label to add.
   * @returns {PubAdsService} The service object on which the method was called.
   */
  setCategoryExclusion(categoryExclusion) {
    this._categoryExclusions.push(categoryExclusion);
    return this;
  }

  /**
   * Clears all page-level ad category exclusion labels. This is useful if you want to refresh the slot.
   *
   * @returns {PubAdsService} The service object on which the method was called.
   */
  clearCategoryExclusions() {
    this._categoryExclusions = [];
    return this;
  }

  _getCategoryExclusions() {
    return this._categoryExclusions.slice(0);
  }

  /**
   * Enables/disables centering of ads. This mode must be set before the service
   * is enabled. Centering is disabled by default. In legacy gpt_mobile.js,
   * centering is enabled by default.
   *
   * @param {boolean} centerAds true to center ads, false to left-align them.
   */
  setCentering(centerAds) {
    this._options.centerAds = centerAds;
  }

  /**
   * Sets cookie options for GPT on the page.
   *
   * @param {number} options The cookie options to set. Set the options parameter
   * to the integer value 1 to ignore cookies, and to 0 to use cookies.
   * @returns {PubAdsService} The service object on which the method was called.
   */
  setCookieOptions(options) {
    this._options.cookieOptions = options;
    return this;
  }

  /**
   * Configures whether all ads on the page should be forced to be rendered using a SafeFrame container.
   *
   * @param {boolean} forceSafeFrame true to force all ads on the page to be
   * rendered in SafeFrames and false to change the previous setting to false.
   * Setting this to false when unspecified earlier, won't change anything.
   * @returns {PubAdsService} The service object on which the function was called.
   */
  setForceSafeFrame(forceSafeFrame) {
    this._options.forceSafeFrame = forceSafeFrame;
    return this;
  }

  /**
   * Passes location information from websites so you can geo-target line items
   * to specific locations. DFP will not use location data unless this feature
   * has been enabled for your network.
   *
   * @param {string|number} latitudeOrAddress Latitude or freeform address.
   * @param {number=} optLongitude The longitude (if a latitude was provided as first argument).
   * @param {number=} optRadius The radius in millimeters. Will be rounded to closest integer.
   * Only used when passing the latitude and longitude.
   * @returns {PubAdsService} The service object on which the method was called.
   */
  setLocation(latitudeOrAddress, optLongitude, optRadius) {
    if (typeof latitudeOrAddress === 'number') {
      this._options.latitude = latitudeOrAddress;
      this._options.longitude = optLongitude;
      this._options.radius = optRadius;
      this._options.address = null;
    } else {
      this._options.address = latitudeOrAddress;
      this._options.latitude = null;
      this._options.longitude = null;
      this._options.radius = null;
    }
    return this;
  }

  /**
   * Sets the value for the publisher-provided ID.
   *
   * @param {string} ppid An alphanumeric ID provided by the publisher with a
   * recommended maximum of 150 characters.
   * @returns {PubAdsService} The service object on which the method was called.
   */
  setPublisherProvidedId(ppid) {
    this._options.ppid = ppid;
    return this;
  }

  /**
   * Sets the page-level preferences for SafeFrame configuration. Any
   * unrecognized keys in the config object will be ignored. The entire config
   * will be ignored if an invalid value is passed for a recognized key. These
   * page level preferences will be overriden by slot level preferences, if
   * specified.
   *
   * @param {SafeFrameConfig} config The configuration object.
   * @returns {PubAdsService} The service object on which the method was called.
   */
  setSafeFrameConfig(config) {
    this._options.safeFrameConfig = config;
    return this;
  }

  /**
   * Configures whether the page should be treated as child-directed.
   *
   * @param {number} value The child-directed treatment tag status to set. Set
   * the options parameter to the integer value 1 to mark the ad request as
   * child-directed, and to 0 for ad requests that are not child-directed.
   * @returns {PubAdsService} The service object on which the method was called.
   */
  setTagForChildDirectedTreatment(value) {
    this._options.tagForChildDirectedTreatment = value;
    return this;
  }

  /**
   * Clears the configuration for whether the page should be treated as child-directed.
   *
   * @returns {PubAdsService} The service object on which the method was called.
   */
  clearTagForChildDirectedTreatment() {
    this._options.tagForChildDirectedTreatment = null;
    return this;
  }

  /**
   * Sets the video content information to be sent along with the ad requests for
   * targeting and content exclusion purposes. Video ads will be automatically
   * enabled when this method is called. For videoContentId and videoCmsId, use
   * the values that are provided to the DFP content ingestion service.
   *
   * @param {string} videoContentId The video content ID.
   * @param {string} videoCmsId The video CMS ID.
   */
  setVideoContent(videoContentId, videoCmsId) {
    this._options.videoContentId = videoContentId;
    this._options.videoCmsId = videoCmsId;
  }

  /**
   * Changes the correlator that is sent with ad requests, effectively starting
   * a new page view. The correlator is the same for all the ad requests coming
   * from one page view, and unique across page views. Only applies to async mode.
   *
   * @returns {PubAdsService} The service object on which the function was called.
   */
  updateCorrelator() {
    return this;
  }

}
