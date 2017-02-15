import CALL_WS  from './CALL_WS';
import isPlainObject from 'lodash.isplainobject';

/**
 * Is the given action a plain JavaScript object with a [CALL_WS] property?
 *
 * @function isRSAA
 * @access public
 * @param {object} action - The action to check
 * @returns {boolean}
 */
function isRSAA(action) {
  return isPlainObject(action) && action.hasOwnProperty(CALL_WS);
}

/**
 * Is the given object a valid type descriptor?
 *
 * @function isValidTypeDescriptor
 * @access private
 * @param {object} obj - The object to check agains the type descriptor definition
 * @returns {boolean}
 */
function isValidTypeDescriptor(obj) {
  const validKeys = [
    'type',
    'payload',
    'meta'
  ]

  if (!isPlainObject(obj)) {
    return false;
  }
  for (let key in obj) {
    if (!~validKeys.indexOf(key)) {
      return false;
    }
  }
  if (!('type' in obj)) {
    return false;
  } else if (typeof obj.type !== 'string' && typeof obj.type !== 'symbol') {
    return false;
  }

  return true;
}

/**
 * Checks an action against the RSAA definition, returning a (possibly empty)
 * array of validation errors.
 *
 * @function validateRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {array}
 */
function validateRSAA(action) {
  var validationErrors = [];
  const validCallWSKeys = [
    'endpoint',
    'method',
    'types'
  ];
  const validMethods = [
    'SUBSCRIBE',
    'UNSUBSCRIBE'
  ];

  if (!isRSAA(action)) {
    validationErrors.push('RSAAs must be plain JavaScript objects with a [CALL_WS] property');
    return validationErrors;
  }

  for (let key in action) {
    if (key !== [CALL_WS]) {
      validationErrors.push(`Invalid root key: ${key}`);
    }
  }

  const callWS = action[CALL_WS];
  if (!isPlainObject(callWS)) {
    validationErrors.push('[CALL_WS] property must be a plain JavaScript object');
  }
  for (let key in callWS) {
    if (!~validCallWSKeys.indexOf(key)) {
      validationErrors.push(`Invalid [CALL_WS] key: ${key}`);
    }
  }

  const { endpoint, method } = callWS;
  if (typeof endpoint === 'undefined') {
    validationErrors.push('[CALL_WS] must have an endpoint property');
  } else if (typeof endpoint !== 'string' && typeof endpoint !== 'function') {
    validationErrors.push('[CALL_WS].endpoint property must be a string or a function');
  }
  if (typeof method === 'undefined') {
    validationErrors.push('[CALL_WS] must have a method property');
  } else if (typeof method !== 'string') {
    validationErrors.push('[CALL_WS].method property must be a string');
  } else if (!~validMethods.indexOf(method.toUpperCase())) {
    validationErrors.push(`Invalid [CALL_WS].method: ${method.toUpperCase()}`);
  }

  if (typeof types === 'undefined') {
    validationErrors.push('[CALL_WS] must have a types property');
  } else if (!Array.isArray(types) || types.length !== 3) {
    validationErrors.push('[CALL_WS].types property must be an array of length 3');
  } else {
    const [subType, unsubType, failureType] = types;
    if (typeof subType !== 'string' && typeof subType !== 'symbol' && !isValidTypeDescriptor(subType)) {
      validationErrors.push('Invalid subscription type');
    }
    if (typeof unsubType !== 'string' && typeof unsubType !== 'symbol' && !isValidTypeDescriptor(unsubType)) {
      validationErrors.push('Invalid unsubscribe type');
    }
    if (typeof failureType !== 'string' && typeof failureType !== 'symbol' && !isValidTypeDescriptor(failureType)) {
      validationErrors.push('Invalid failure type');
    }
  }

  return validationErrors;
}

/**
 * Is the given action a valid RSAA?
 *
 * @function isValidRSAA
 * @access public
 * @param {object} action - The action to check against the RSAA definition
 * @returns {boolean}
 */
function isValidRSAA(action) {
  return !validateRSAA(action).length;
}

export { isRSAA, isValidTypeDescriptor, validateRSAA, isValidRSAA };
