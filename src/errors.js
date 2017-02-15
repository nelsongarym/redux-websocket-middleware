/**
 * Error class for an RSAA that does not conform to the RSAA definition
 *
 * @class InvalidRSAA
 * @access public
 * @param {array} validationErrors - an array of validation errors
 */
class InvalidRSAA extends Error {
  constructor(validationErrors) {
    super();
    this.name = 'InvalidRSAA';
    this.message = 'Invalid RSAA';
    this.validationErrors = validationErrors;
  }
}

/**
 * Error class for a custom `payload` or `meta` function throwing
 *
 * @class InternalError
 * @access public
 * @param {string} message - the error message
 */
class InternalError extends Error {
  constructor(message) {
    super();
    this.name = 'InternalError';
    this.message = message;
  }
}

/**
 * Error class for an error raised trying to subscribe
 *
 * @class SubscribeError
 * @access public
 * @param {string} message - the error message
 */
class SubscribeError extends Error {
  constructor(message) {
    super();
    this.name = 'SubscribeError';
    this.message = message;
  }
}

/**
 * Error class for an error raised trying to unsubscribe
 *
 * @class UnsubscribeError
 * @access public
 * @param {string} message - the error message
 */
class UnsubscribeError extends Error {
  constructor(message) {
    super();
    this.name = 'UnsubscribeError';
    this.message = message;
  }
}

/**
 * Error class for a client
 *
 * @class ClientError
 * @access public
 * @param {string} message - the error message
 */
class ClientError extends Error {
  constructor(message) {
    super();
    this.name = 'ClientError';
    this.message = message;
  }
}

export { InvalidRSAA, InternalError, SubscribeError, UnsubscribeError, ClientError };
