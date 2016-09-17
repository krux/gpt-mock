import Service from './Service';

/**
 * The content service. This service is used to set the content of a slot manually.
 */
export default class ContentService extends Service {
  /**
   * Creates a new {@link ContentService}.
   *
   * @param {GPT} gpt The containing {@link GPT} instance.
   */
  constructor(gpt) {
    super(gpt, ContentService._name);
    this._storedContent = [];
  }

  /**
   * The name of the service.
   *
   * @type {string}
   * @private
   */
  static get _name() {
    return 'content';
  }

  /**
   * Enables the service.
   *
   * @override
   */
  enable() {
    super.enable();
    for (let [slot, content] of this._storedContent) {
      slot._setContent(content);
    }
    this._storedContent = null;
  }

  /**
   * Fills a slot with the given content. If services are not yet enabled,
   * stores the content and fills it in when services are enabled.
   *
   * @param {Slot} slot The slot to be filled.
   * @param {string} content The HTML content for the slot.
   */
  setContent(slot, content) {
    if (this._enabled) {
      slot._setContent(content);
    } else {
      this._storedContent.push([slot, content]);
    }
  }
}
