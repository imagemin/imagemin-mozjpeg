'use strict';

var spawn = require('child_process').spawn;
var isJpg = require('is-jpg');
var mozjpeg = require('mozjpeg').path;
var through = require('through2');

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({objectMode: true}, function (file, enc, cb) {
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

		if (opts.quality) {
			args.push('-quality', opts.quality);
		}

		var cp = spawn(mozjpeg, args);

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			var err = new Error(data);
			err.fileName = file.path;
			cb(err);
			return;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('error', function (err) {
			err.fileName = file.path;
			cb(err);
			return;
		});

		cp.on('close', function () {
			if (len < file.contents.length) {
				file.contents = Buffer.concat(ret, len);
			}

			cb(null, file);
		});

		cp.stdin.end(file.contents);
	});
};
