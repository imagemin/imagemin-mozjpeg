'use strict';
var fs = require('fs');
var path = require('path');
var isJpg = require('is-jpg');
var isProgressive = require('is-progressive');
var pify = require('pify');
var test = require('ava');
var imageminMozjpeg = require('../');
var fsP = pify(fs);

test('optimize a JPG', function (t) {
	t.plan(3);

	fsP.readFile(path.join(__dirname, 'fixtures/test.jpg')).then(function (buf) {
		imageminMozjpeg()(buf).then(function (data) {
			t.assert(data.length < buf.length, data.length);
			t.assert(isJpg(data));
			t.assert(isProgressive.buffer(data));
		});
	});
});

test('support mozjpeg options', function (t) {
	t.plan(1);

	fsP.readFile(path.join(__dirname, 'fixtures/test.jpg')).then(function (buf) {
		imageminMozjpeg({progressive: false})(buf).then(function (data) {
			t.assert(!isProgressive.buffer(data));
		});
	});
});

test('skip optimizing a non-JPG file', function (t) {
	t.plan(1);

	fsP.readFile(__filename).then(function (buf) {
		imageminMozjpeg()(buf).then(function (data) {
			t.assert(data.length === buf.length);
		});
	});
});

test('throw error when a JPG is corrupt', function (t) {
	t.plan(1);

	fsP.readFile(path.join(__dirname, 'fixtures/test-corrupt.jpg')).then(function (buf) {
		imageminMozjpeg()(buf).catch(function (err) {
			t.assert(/Corrupt JPEG data/.test(err.message), err.message);
		});
	});
});
