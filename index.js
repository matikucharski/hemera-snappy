'use strict';

const SnappyJS = require('snappyjs');
const Hp = require('hemera-plugin');

const pluginName = require('./package.json').name;
module.exports = Hp(hemeraSnappy, {
    hemera: '>=3',
    name: pluginName,
    options: {},
    dependencies: []
});

function hemeraSnappy(hemera, opts, done) {
    function uncompress(msg) {
        try {
            return {
                value: SnappyJS.uncompress(msg)
            };
        } catch (error) {
            return {
                error
            };
        }
    }

    function compress(msg) {
        try {
            return {
                value: SnappyJS.compress(Buffer.from(msg))
            };
        } catch (error) {
            return {
                error
            };
        }
    }

    hemera.encoder.add(compress);
    // first uncompress then decode
    hemera.decoder.first(uncompress);

    done();
}
