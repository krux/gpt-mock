/**
 * @typedef {Array<!SingleSize>} MultiSize
 * @private
 */
import * as SingleSize from './SingleSize';

/**
 * Returns true if the given object is a {@link MultiSize}.
 *
 * @private
 * @param {MultiSize|*} obj The object to test
 */
export function isMultiSize(obj) {
  if (!Array.isArray(obj)) {
    return false;
  }

  for (let ele of obj) {
    if (!SingleSize.isSingleSize(ele)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns an array of {@link Size} instances from the {@link MultiSize}.
 *
 * @private
 * @param {MultiSize|*} obj The object to convert.
 * @returns {Array<Size>} The {@link Size} instances or empty array if the object
 * is not a {@link MultiSize}.
 */
export function toSizes(obj) {
  const acc = [];

  if (!Array.isArray(obj)) {
    return acc;
  }

  for (let ele of obj) {
    const size = SingleSize.toSize(ele);
    if (size != null) {
      acc.push(size);
    } else {
      return [];
    }
  }

  return acc;
}
