/**
 * Each size mapping is an array of two elements: SingleSizeArray and GeneralSize.
 *
 * @typedef {Array<SingleSizeArray|GeneralSize>} SizeMapping
 */
import * as GeneralSize from './GeneralSize';
import * as SingleSizeArray from './SingleSizeArray';

/**
 * Returns true if the object is a {@link SizeMapping}.
 *
 * @param {SizeMapping|*} obj The object to test
 */
export function isSizeMapping(obj) {
  if (!Array.isArray(obj) || obj.length !== 2) {
    return false;
  }

  const [viewport, mappings] = obj;

  return SingleSizeArray.isSingleSizeArray(viewport) &&
    GeneralSize.isGeneralSize(mappings);
}
