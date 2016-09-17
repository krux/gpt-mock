/**
 * Named sizes that a slot can have. In most cases size is a fixed-size rectangle
 * but there are some cases when we need other kinds of size specifications.
 *
 * Only the following are valid named sizes:
 * * 'fluid': the ad container takes 100% width of parent div and then resizes
 *   its height to fit creative content. Similar to how regular block elements
 *   on a page behave. Used for native ads (see related article
 *   https://support.google.com/dfp_premium/answer/6366905).
 *
 * @typedef {string} NamedSize
 * @private
 */

/**
 * Returns true if the given object is a {@link NamedSize}.
 *
 * @private
 * @param {NamedSize|*} obj The object to test
 */
export function isNamedSize(obj) {
  return obj === 'fluid';
}
