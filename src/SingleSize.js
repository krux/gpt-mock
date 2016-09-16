/**
 * @typedef {SingleSizeArray|NamedSize} SingleSize
 */
import * as SingleSizeArray from './SingleSizeArray';
import * as NamedSize from './NamedSize';

/**
 * Returns true if the given object is a {@link SingleSize}.
 *
 * @param {SingleSize|*} obj The object to test
 */
export function isSingleSize(obj) {
  return SingleSizeArray.isSingleSizeArray(obj) || NamedSize.isNamedSize(obj);
}

/**
 * Returns a {@link Size} instance from the {@link SingleSize}.
 *
 * @param {SingleSize|*} obj The object to convert.
 * @returns {?Size} The Size instance or null if the object is not a {@link SingleSizeArray}.
 */
export function toSize(obj) {
  if (SingleSizeArray.isSingleSizeArray(obj)) {
    return SingleSizeArray.toSize(obj);
  } else {
    return null; // TODO - what really happens here?
  }
}
