/**
 * @typedef {Array<!SingleSize>} MultiSize
 */
import * as SingleSize from './SingleSize';

/**
 * Returns true if the given object is a MultiSize.
 *
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
 * @param {MultiSize|*} obj The object to convert.
 * @returns {Array<Size>} The Size instance or null if the object is not a {@link MultiSize}.
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
