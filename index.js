'use strict';

var isJpg = require('is-jpg');
var mozjpeg = require('mozjpeg').path;
var spawn = require('child_process').spawn;
var through = require('through2');

/**
 * mozjpeg imagemin plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({ objectMode: true }, function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (!isJpg(file.contents)) {
			cb(null, file);
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
			cb(new Error(data));
			return;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('close', function () {
			file.contents = Buffer.concat(ret, len);
			cb(null, file);
		});

		cp.stdin.end(file.contents);
	});
};
