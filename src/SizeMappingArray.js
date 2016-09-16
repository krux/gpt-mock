/**
 * @typedef {Array<!SizeMapping>} SizeMappingArray
 */
import * as SizeMapping from './SizeMapping';

/**
 * Returns true if the object is a {@link SizeMappingArray}.
 *
 * @param {SizeMappingArray|*} obj The object to test
 */
export function isSizeMappingArray(obj) {
  if (!Array.isArray(obj)) {
    return false;
  }

  for (let ele of obj) {
    if (!SizeMapping.isSizeMapping(ele)) {
      return false;
    }
  }

  return true;
}
