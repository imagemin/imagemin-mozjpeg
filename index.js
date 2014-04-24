'use strict';

var ExecBuffer = require('exec-buffer');
var imageType = require('image-type');
var mozjpeg = require('mozjpeg').path;

/**
 * mozjpeg image-min plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
    opts = opts || {};

    return function (file, imagemin, cb) {
        if (imageType(file.contents) !== 'jpg') {
            return cb();
        }

        var exec = new ExecBuffer();
        var args = ['-copy', 'none'];

        exec
            .use(mozjpeg, args.concat(['-outfile', exec.dest(), exec.src()]))
            .run(file.contents, function (err, buf) {
                if (err) {
                    return cb(err);
                }

                file.contents = buf;
                cb();
            });
    };
};
