/**
 * Public interface for ResponseInformation.
 */
export default class ResponseInformation {
  /**
   * Creates a new {@link ResponseInformation}.
   *
   * @param {string} advertiserId The ID of the advertiser.
   * @param {string} campaignId The ID of the campaign.
   * @param {?number} lineItemId The ID of the line item.
   * @param {?number} creativeId The ID of the creative.
   * @param {?Array<number>} [labelIds] The label IDs of the creative.
   */
  constructor(advertiserId, campaignId, lineItemId, creativeId, labelIds) {
    this._advertiserId = advertiserId;
    this._campaignId = campaignId;
    this._lineItemId = lineItemId;
    this._creativeId = creativeId;
    this._labelIds = labelIds;
  }

  /**
   * The ID of the advertiser.
   *
   * @type {string}
   */
  get advertiserId() {
    return this._advertiserId;
  }

  /**
   * The ID of the campaign.
   *
   * @type {string}
   */
  get campaignId() {
    return this._campaignId;
  }

  /**
   * The ID of the line item.
   *
   * @type {?number}
   */
  get lineItemId() {
    return this._lineItemId;
  }

  /**
   * The ID of the creative.
   *
   * @type {?number}
   */
  get creativeId() {
    return this._creativeId;
  }

  /**
   * The label IDs of the creative.
   *
   * @type {?Array<number>}
   */
  get labelIds() {
    return this._labelIds;
  }
}
