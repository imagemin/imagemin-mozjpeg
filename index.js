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
			cb();
			return;
		}

		var exec = new ExecBuffer();
		var args = ['-copy', 'none'];

		if (opts.fastcrush) {
			args.push('-fastcrush');
		}

		exec
			.use(mozjpeg, args.concat(['-outfile', exec.dest(), exec.src()]))
			.run(file.contents, function (err, buf) {
				if (err) {
					cb(err);
					return;
				}

				file.contents = buf;
				cb();
			});
	};
};
