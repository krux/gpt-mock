import CompanionAdsService from './CompanionAdsService';
import ContentService from './ContentService';
import PubAdsService from './PubAdsService';
import Slot from './Slot';
import SizeMappingBuilder from './SizeMappingBuilder';
import CommandArray from './CommandArray';

/**
 * This is the global namespace that the Google Publisher Tag uses for its API.
 *
 * For details on this API, see https://developers.google.com/doubleclick-gpt/reference.
 *
 * @namespace googletag
 *
 * @property {boolean|undefined} apiReady Flag indicating that GPT API is loaded
 * and ready to be called. This property will be simply undefined until the API
 * is ready.
 *
 * Note that the recommended way of handling async is to use {@link #cmd} to
 * queue callbacks for when GPT is ready. These callbacks do not have to check
 * {@link #apiReady} as they are guaranteed to execute once the API is set up.
 *
 * @property {boolean|undefined} pubadsReady Flag indicating that Pubads service
 * is enabled, loaded and fully operational.
 * This property will be simply `undefined` until {@link #enableServices()}
 * is called and Pubads service is loaded and initialized.
 *
 * @property {!Array<function()>|!CommandArray} cmd Reference to the global
 * command queue for asynchronous execution of GPT-related calls.
 *
 * The {@link #cmd} variable is initialized to an empty JavaScript array by
 * the GPT tag syntax on the page, and cmd.push is the standard Array.push
 * method that adds an element to the end of the array. When the GPT JavaScript
 * is loaded, it looks through the array and executes all the functions in
 * order. The script then replaces cmd with a CommandArray object
 * whose push method is defined to execute the function argument passed to it.
 * This mechanism allows GPT to reduce perceived latency by fetching the
 * JavaScript asynchronously while allowing the browser to continue rendering
 * the page.
 *
 */
export default class GoogleTag {
  /**
   * Creates a new GoogleTag instance.
   */
  constructor() {
    this.apiReady = void 0;
    this.pubadsReady = void 0;
    this.cmd = [];
    this._slots = [];
    this._services = {};
    this._addService(new CompanionAdsService(this));
    this._addService(new ContentService(this));
    this._addService(new PubAdsService(this));
    this._title = null;
  }

  /**
   * Returns the current version of GPT.
   *
   * @returns {string} Version string.
   */
  getVersion() {
    return '94';
  }

  /**
   * Returns a reference to the companion ads service.
   *
   * @returns {CompanionAdsService} Instance of the companion ads service.
   */
  companionAds() {
    return this._services[CompanionAdsService._name];
  }

  /**
   * Returns a reference to the content service.
   *
   * @returns {ContentService} Instance of the content service.
   */
  content() {
    return this._services[ContentService._name];
  }

  /**
   * Returns a reference to the pubads service.
   *
   * @returns {PubAdsService} Instance of the pubads service.
   */
  pubads() {
    return this._services[PubAdsService._name];
  }

  /**
   * Enables all GPT services that have been defined for ad slots on the page.
   */
  enableServices() {
    for (let service in this._services) {
      if (this._services.hasOwnProperty(service)) {
        this._services[service].enable();
      }
    }
  }

  /**
   * Creates a new SizeMappingBuilder.
   *
   * @returns {SizeMappingBuilder} A new builder.
   */
  sizeMapping() {
    return new SizeMappingBuilder();
  }

  /**
   * Constructs an ad slot with a given ad unit path and size and associates it
   * with the ID of a div element on the page that will contain the ad.
   *
   * @param {string} adUnitPath Full path of the ad unit with the network code and unit code.
   * @param {GeneralSize} size Width and height of the added slot. This is the
   * size that is used in the ad request if no responsive size mapping is provided
   * or the size of the viewport is smaller than the smallest size provided in the mapping.
   * @param {string=} optDiv ID of the div that will contain this ad unit.
   * @returns {Slot} The newly created slot.
   */
  defineSlot(adUnitPath, size, optDiv) {
    const slot = new Slot(adUnitPath, size, optDiv);
    this._slots.push(slot);
    return slot;
  }

  /**
   * Constructs an out-of-page (interstitial) ad slot with the given ad unit path.
   * optDiv is the ID of the div element that will contain the ad.
   *
   * @param {string} adUnitPath Full path of the ad unit with the network code and ad unit code.
   * @param {string=} optDiv ID of the div that will contain this ad unit.
   * @returns {Slot} The newly created slot.
   */
  defineOutOfPageSlot(adUnitPath, optDiv) {
    const slot = new Slot(adUnitPath, [], optDiv);
    slot._outOfPage = true;
    this._slots.push(slot);
    return slot;
  }

  /**
   * Destroys the given slots, removes all related objects and references of
   * given slots from GPT. This API does not support passback slots and
   * companion slots. Calling this API clears the ad and removes the slot object
   * from the internal state maintained by GPT. Calling any more functions on
   * that slot object will result in undefined behaviour. Note the browser may
   * still not free the memory associated with that slot if a reference to it is
   * maintained by the publisher page. Calling this API makes the div associated
   * with that slot available for reuse.
   *
   * @param {Array<!Slot>=} optSlots The array of slots to
   * destroy. Array is optional; all slots will be destroyed if it is unspecified.
   * @returns {boolean} true if slots have been destroyed, false otherwise.
   */
  destroySlots(optSlots) {
    if (optSlots == null) {
      this.slots = [];
    } else {
      // TODO - destroy selective slots
    }
    return true;
  }

  /**
   * Instructs slot services to render the slot. Each ad slot should only be
   * displayed once per page. All slots must be defined and have a service
   * associated with them before being displayed. The display call must not
   * happen until the element is present in the DOM. The usual way to achieve
   * that is to place it within a script block within the div element named in
   * the method call.
   *
   * If single request architecture (SRA) is being used, all unfetched ad slots
   * at the moment display is called will be fetched in a single instance of
   * {@link #display()}. To force an ad slot not to display, the entire div
   * must be removed.
   *
   * @param {string} div ID of the div element containing the ad slot.
   */
  display(div) {
    if (div) {
      // TODO
    }
  }

  /**
   * Opens the Google Publisher Console.
   */
  openConsole() {}

  /**
   * Disables the Google Publisher Console.
   */
  disablePublisherConsole() {}

  /**
   * Sets that title for all ad container iframes created by pubads service,
   * from this point onwards.
   *
   * @param {string} title The title to set.
   */
  setAdIframeTitle(title) {
    this._title = title;
  }

  _addService(service) {
    this._services[service.getName()] = service;
    return service;
  }

  _loaded() {
    this.apiReady = true;
    this.cmd = new CommandArray(this.cmd);
  }

}
