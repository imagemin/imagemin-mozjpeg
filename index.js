'use strict';

var spawn = require('child_process').spawn;
var isJpg = require('is-jpg');
var mozjpeg = require('mozjpeg');
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

		var args = [];
		var err = '';
		var ret = [];
		var len = 0;

		if (typeof opts.quality !== 'undefined') {
			args.push('-quality', opts.quality);
		}

		if (opts.progressive === false) {
			args.push('-baseline');
		}

		if (opts.targa) {
			args.push('-targa');
		}

		if (opts.revert) {
			args.push('-revert');
		}

		if (opts.fastcrush) {
			args.push('-fastcrush');
		}

		if (typeof opts.dcScanOpt !== 'undefined') {
			args.push('-dc-scan-opt', opts.dcScanOpt);
		}

		if (opts.notrellis) {
			args.push('-notrellis');
		}

		if (opts.notrellisDC) {
			args.push('-notrellis-dc');
		}

		if (opts.tune) {
			args.push('-tune-' + opts.tune);
		}

		if (opts.noovershoot) {
			args.push('-noovershoot');
		}

		if (opts.arithmetic) {
			args.push('-arithmetic');
		}

		if (opts.dct) {
			args.push('-dct', opts.dct);
		}

		if (typeof opts.quantTable !== 'undefined') {
			args.push('-quant-table', opts.quantTable);
		}

		if (opts.smooth) {
			args.push('-smooth', opts.smooth);
		}

		if (opts.maxmemory) {
			args.push('-maxmemory', opts.maxmemory);
		}

		var cp = spawn(mozjpeg, args);

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			err += data;
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

		cp.on('close', function (code) {
			if (code) {
				err = new Error(err);
				err.fileName = file.path;
				cb(err);
				return;
			}

			if (len < file.contents.length) {
				file.contents = Buffer.concat(ret, len);
			}

			cb(null, file);
		});

		cp.stdin.on('error', function (stdinErr) {
			if (!err) {
				err = stdinErr;
			}
		});

		cp.stdin.end(file.contents);
	});
};
