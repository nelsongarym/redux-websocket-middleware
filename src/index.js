/**
 * Redux middleware for calling an API
 * @module redux-sockjs-middleware
 * @requires isomorphic-fetch
 * @requires lodash.isplainobject
 * @exports {symbol} CALL_WS
 * @exports {function} isRSAA
 * @exports {function} validateRSAA
 * @exports {function} isValidRSAA
 * @exports {error} InvalidRSAA
 * @exports {error} InternalError
 * @exports {error} SubscribeError
 * @exports {error} UnsubscribeError
 * @exports {error} UnsubscribeError
 * @exports {error} ClientError
 * @exports {function} getJSON
 * @exports {ReduxMiddleWare} apiMiddleware
 */

/**
 * @typedef {function} ReduxMiddleware
 * @param {object} store
 * @returns {ReduxNextHandler}
 *
 * @typedef {function} ReduxNextHandler
 * @param {function} next
 * @returns {ReduxActionHandler}
 *
 * @typedef {function} ReduxActionHandler
 * @param {object} action
 * @returns undefined
 */

import CALL_WS from './CALL_WS';
import { isRSAA, validateRSAA, isValidRSAA } from './validation';
import { InvalidRSAA, InternalError, SubscribeError, UnsubscribeError, ClientError } from './errors';
import { getJSON } from './util';
import { apiMiddleware } from './middleware';

export {
  CALL_WS,
  isRSAA,
  validateRSAA,
  isValidRSAA,
  InvalidRSAA,
  InternalError,
  SubscribeError,
  UnsubscribeError,
  ClientError,
  getJSON,
  apiMiddleware
};
