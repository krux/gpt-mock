/**
 * Array of two numbers representing [width, height].
 * @typedef {Array<number>} SingleSizeArray
 * @private
 */
import Size from './Size';

/**
 * Returns true if the given object is a {@link SingleSizeArray}.
 *
 * @private
 * @param {SingleSizeArray|*} obj The object to test
 */
export function isSingleSizeArray(obj) {
  if (obj == null || !Array.isArray(obj) || obj.length !== 2) {
    return false;
  }

  const [w, h] = obj;
  return isInteger(w) && isInteger(h);
}

/**
 * Returns a {@link Size} instance from the {@link SingleSizeArray}.
 *
 * @private
 * @param {SingleSizeArray|*} obj The object to convert.
 * @returns {?Size} The {@link Size} instance or null if the object is not
 * a {@link SingleSizeArray}.
 */
export function toSize(obj) {
  if (isSingleSizeArray(obj)) {
    const [w, h] = obj;
    return new Size(w, h);
  } else {
    return null;
  }
}

/**
 * Returns true if the specified parameter is an integer.
 *
 * @private
 * @param {*} n The value to check
 * @returns {boolean} True if the value is an integer.
 */
function isInteger(n) {
  return (typeof n === 'number') && (n % 1 === 0);
}
