# Hemera-snappy package

This is modified fork of [hemera-snappy](https://github.com/hemerajs/hemera/tree/nats-hemera%402.4.3/packages/hemera-snappy).

This is a plugin to use [Google Snappy](https://github.com/google/snappy) with Hemera.

Snappy is a compression/decompression library. It does not aim for maximum compression, or compatibility with any other compression library; instead, it aims for very high speeds and reasonable compression.


#### Example

```js
'use strict';

const Hemera = require('nats-hemera');
// Use NATS driver >= 0.7.2
const nats = require('nats').connect({ 
  // otherwise NATS will interpret all data as LATIN1 (binary encoding)
  preserveBuffers: true
});
const HemeraSnappy = require('hemera-snappy');

const hemera = new Hemera(nats, {
  logLevel: 'info'
});

hemera.use(HemeraSnappy);

hemera.ready(() => {
  hemera.add({
    topic: 'math',
    cmd: 'add'
  }, (req, cb) => {

    cb(null, req.a + req.b)
  });

  hemera.act({
    topic: 'math',
    cmd: 'add',
    a: 1,
    b: 20
  }, function (err, resp) {

    this.log.info('Result', resp)
  });
});

```