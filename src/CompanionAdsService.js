import Service from './Service';

/**
 * Companion Ads service. This service is used by video ads to show companion ads.
 */
export default class CompanionAdsService extends Service {
  /**
   * Creates a new CompanionAdsService.
   *
   * @param {GPT} gt The containing GPT instance.
   */
  constructor(gt) {
    super(gt, CompanionAdsService._name);
    this._options = {
      syncLoading: false,
      refreshUnfilledSlots: null
    };
  }

  static get _name() {
    return 'companion_ads';
  }

  /**
   * Enables the service implementation to be loaded synchronously. This needs
   * to be called before {@link GPT#enableServices()}.
   *
   * Note: this call can be only used if gpt.js is also loaded synchronously,
   * for example, by using a script element. If called when GPT is loaded
   * asynchronously, the outcome of the loading is undefined.
   */
  enableSyncLoading() {
    this._options.syncLoading = true;
  }

  /**
   * Sets whether companion slots that have not been filled will be automatically
   * backfilled. Only slots that are also registered with the pubads service will
   * be backfilled. This method can be called multiple times during the page's
   * lifetime to turn backfill on and off.
   *
   * @param {boolean} value true to automatically backfill unfilled slots,
   * false to leave them unchanged.
   */
  setRefreshUnfilledSlots(value) {
    this._options.refreshUnfilledSlots = value;
  }

  /**
   * Undocumented
   */
  // refreshAllSlots()
  // fillSlot(a, b, c, d)
  // notifyUnfilledSlots(a)
  // setClearUnfilledSlots(a)

  getDisplayAdsCorrelator() {
    return 'TODO';
  }

  getVideoStreamCorrelator() {
    return 'TODO';
  }

  isRoadblockingSupported() {
    return false;
  }

  isSlotAPersistentRoadblock() {
    return false;
  }
}
