'use strict';
const execa = require('execa');
const isJpg = require('is-jpg');
const mozjpeg = require('mozjpeg');

module.exports = options => buffer => {
	options = Object.assign({}, options);

	if (!Buffer.isBuffer(buffer)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isJpg(buffer)) {
		return Promise.resolve(buffer);
	}

	const args = [];

	if (typeof options.quality !== 'undefined') {
		args.push('-quality', options.quality);
	}

	if (options.progressive === false) {
		args.push('-baseline');
	}

	if (options.targa) {
		args.push('-targa');
	}

	if (options.revert) {
		args.push('-revert');
	}

	if (options.fastcrush) {
		args.push('-fastcrush');
	}

	if (typeof options.dcScanOpt !== 'undefined') {
		args.push('-dc-scan-opt', options.dcScanOpt);
	}

	if (options.notrellis) {
		args.push('-notrellis');
	}

	if (options.notrellisDC) {
		args.push('-notrellis-dc');
	}

	if (options.tune) {
		args.push(`-tune-${options.tune}`);
	}

	if (options.noovershoot) {
		args.push('-noovershoot');
	}

	if (options.arithmetic) {
		args.push('-arithmetic');
	}

	if (options.dct) {
		args.push('-dct', options.dct);
	}

	if (typeof options.quantTable !== 'undefined') {
		args.push('-quant-table', options.quantTable);
	}

	if (options.smooth) {
		args.push('-smooth', options.smooth);
	}

	if (options.maxmemory) {
		args.push('-maxmemory', options.maxmemory);
	}

	return execa.stdout(mozjpeg, args, {
		encoding: null,
		input: buffer,
		maxBuffer: Infinity
	});
};
