import isPlainObject from 'lodash.isplainobject';

import CALL_WS from './CALL_WS';
import { isRSAA, validateRSAA } from './validation';
import { InvalidRSAA, InternalError, SubscribeError, UnsubscribeError, ClientError } from './errors' ;
import { getJSON, normalizeTypeDescriptors, actionWith } from './util';

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware({ getState }) {
  return (next) => async (action) => {
    // Do not process actions without a [CALL_WS] property
    if (!isRSAA(action)) {
      return next(action);
    }

    // Try to dispatch an error request FSA for invalid RSAAs
    const validationErrors = validateRSAA(action);
    if (validationErrors.length) {
      const callWS = action[CALL_WS];
      if (callWS.types && Array.isArray(callWS.types)) {
        let subType = callWS.types[0];
        if (subType && subType.type) {
          subType = subType.type;
        }
        next({
          type: subType,
          payload: new InvalidRSAA(validationErrors),
          error: true
        });
      }
      return;
    }

    // Parse the validated RSAA action
    const callWS = action[CALL_WS];
    var { endpoint, headers } = callAPI;
    const { method, types } = callWS;
    const [subType, unsubType, failureType] = normalizeTypeDescriptors(types);


    // Process [CALL_WS].endpoint function
    if (typeof endpoint === 'function') {
      try {
        endpoint = endpoint(getState());
      } catch (e) {
        return next(await actionWith(
          {
            ...subType,
            payload: new SubscribeError('[CALL_WS].endpoint function failed'),
            error: true
          },
          [action, getState()]
        ));
      }
    }

    // We can now dispatch the sub FSA
    next(await actionWith(
      subType,
      [action, getState()]
    ));

    try {
      // Make the WS call
      //
      //
      //
    } catch(e) {
      // The request was malformed, or there was a network error
      return next(await actionWith(
        {
          ...subType,
          payload: new ClientError(e.message),
          error: true
        },
        [action, getState()]
      ));
    }

    // Process the server response
    if (res.ok) {
      return next(await actionWith(
        successType,
        [action, getState(), res]
      ));
    } else {
      return next(await actionWith(
        {
          ...failureType,
          error: true
        },
        [action, getState(), res]
      ));
    }
  }
}

export { apiMiddleware };
