'use strict';

var File = require('vinyl');
var fs = require('fs');
var isJpg = require('is-jpg');
var mozjpeg = require('../');
var path = require('path');
var test = require('ava');

test('optimize a JPG', function (t) {
	t.plan(3);

	fs.readFile(path.join(__dirname, 'fixtures/test.jpg'), function (err, buf) {
		t.assert(!err);

		var stream = mozjpeg();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(data.contents.length < buf.length);
			t.assert(isJpg(data.contents));
		});

		stream.end(file);
	});
});
