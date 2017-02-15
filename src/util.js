import { InternalError, ClientError } from './errors';

/**
 * Extract JSON body from a server response
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
async function getJSON(res) {
  const contentType = res.headers.get('Content-Type');
  const emptyCodes = [204, 205];

  if (!~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json')) {
    return await res.json();
  } else {
    return await Promise.resolve();
  }
}

/**
 * Blow up string or symbol types into full-fledged type descriptors,
 *   and add defaults
 *
 * @function normalizeTypeDescriptors
 * @access private
 * @param {array} types - The [CALL_WS].types from a validated RSAA
 * @returns {array}
 */
function normalizeTypeDescriptors(types) {
  let [subType, unsubType, failureType] = types;

  if (typeof subType === 'string' || typeof subType === 'symbol') {
    subType = { type: subType };
  }

  if (typeof unsubType === 'string' || typeof unsubType === 'symbol') {
    unsubType = { type: unsubType };
  }

  if (typeof failureType === 'string' || typeof failureType === 'symbol') {
    failureType = { type: failureType };
  }
  failureType = {
    payload: (action, state, res) =>
      getJSON(res).then(
        (json) => new ClientError(res.status, res.statusText, json)
      ),
    ...failureType
  };

  return [subType, unsubType, failureType];
}

/**
 * Evaluate a type descriptor to an FSA
 *
 * @function actionWith
 * @access private
 * @param {object} descriptor - A type descriptor
 * @param {array} args - The array of arguments for `payload` and `meta` function properties
 * @returns {object}
 */
async function actionWith(descriptor, args) {
  try {
    descriptor.payload = await (
      typeof descriptor.payload === 'function' ?
      descriptor.payload(...args) :
      descriptor.payload
    );
  } catch (e) {
    descriptor.payload = new InternalError(e.message);
    descriptor.error = true;
  }

  try {
    descriptor.meta = await (
      typeof descriptor.meta === 'function' ?
      descriptor.meta(...args) :
      descriptor.meta
    );
  } catch (e) {
    delete descriptor.meta;
    descriptor.payload = new InternalError(e.message);
    descriptor.error = true;
  }

  return descriptor;
}

export { getJSON, normalizeTypeDescriptors, actionWith };
