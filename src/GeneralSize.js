/**
 * Represents either a single [W, H] size, named size or an array of sizes.
 *
 * @typedef {SingleSize|MultiSize} GeneralSize
 */
import * as SingleSize from './SingleSize';
import * as MultiSize from './MultiSize';

/**
 * Returns true if the given object is a {@link GeneralSize}.
 *
 * @param {GeneralSize|*} obj The object to test
 */
export function isGeneralSize(obj) {
  return SingleSize.isSingleSize(obj) || MultiSize.isMultiSize(obj);
}

/**
 * Returns an array of {@link Size} instances from the {@link GeneralSize}.
 *
 * @param {GeneralSize|*} obj The object to convert.
 * @returns {Array<Size>} The Size instance or null if the object is not a {@link GeneralSize}.
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
