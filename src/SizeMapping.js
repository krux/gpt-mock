/**
 * Each size mapping is an array of two elements: {@link SingleSizeArray} and
 * {@link GeneralSize}.
 *
 * @typedef {Array<SingleSizeArray|GeneralSize>} SizeMapping
 * @private
 */
import * as GeneralSize from './GeneralSize';
import * as SingleSizeArray from './SingleSizeArray';

/**
 * Returns true if the object is a {@link SizeMapping}.
 *
 * @private
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
