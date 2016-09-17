/**
 * Represents either a [W, H] {@link SingleSize}, {@link NamedSize} or {@link MultiSize}.
 *
 * @private
 *
 * @typedef {SingleSize|MultiSize} GeneralSize
 */
import * as SingleSize from './SingleSize';
import * as MultiSize from './MultiSize';

/**
 * Returns true if the given object is a {@link GeneralSize}.
 *
 * @private
 *
 * @param {GeneralSize|*} obj The object to test
 */
export function isGeneralSize(obj) {
  return obj != null && (SingleSize.isSingleSize(obj) || MultiSize.isMultiSize(obj));
}

/**
 * Returns an array of {@link Size} instances from the {@link GeneralSize}.
 *
 * @private
 *
 * @param {GeneralSize|*} obj The object to convert.
 * @returns {Array<Size>} The {@link Size} instances or empty array if the object
 * is not a {@link GeneralSize}.
 */
export function toSizes(obj) {
  if (obj == null || (Array.isArray(obj) && obj.length == 0)) {
    return [];
  } else if (SingleSize.isSingleSize(obj)) {
    return [SingleSize.toSize(obj)];
  } else if (MultiSize.isMultiSize(obj)) {
    return MultiSize.toSizes(obj);
  } else {
    return [];
  }
}
