'use strict';

var imageType = require('image-type');
var mozjpeg = require('mozjpeg').path;
var spawn = require('child_process').spawn;

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

		var args = ['-copy', 'none'];
		var ret = [];
		var len = 0;

		if (opts.fastcrush) {
			args.push('-fastcrush');
		}

		var cp = spawn(mozjpeg, args);

		cp.on('error', function (err) {
			cb(err);
			return;
		});

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			cb(data);
			return;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('close', function () {
			file.contents = Buffer.concat(ret, len);
			cb();
		});

		cp.stdin.end(file.contents);
	};
};
