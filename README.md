redux-websocket-middleware
====================

[Redux middleware](http://rackt.github.io/redux/docs/advanced/Middleware.html) for managing Websocket connections.

## Table of contents

1. [Introduction](#introduction)
2. [License](License)
3. [Acknowledgements](#acknowledgements)

## Introduction

This middleware receives *Redux Standard WS-calling Actions* (RSAAs) and dispatches *Flux Standard Actions* (FSAs) to the next middleware.

RSAAs are identified by the presence of a `[CALL_WS]` property, where [`CALL_WS`](#CALL_WS) is a `Symbol` defined in, and exported by `redux-websocket-middleware`. They contain information describing an Websocket call and three different types of FSAs, known as the *subscribe*, *unsubscribe* and *failure* FSAs.

## License

MIT


## Acknowledgements

The code in this module was originally extracted and inspired by [redux-api-middleware](https://github.com/agraboso/redux-api-middleware)