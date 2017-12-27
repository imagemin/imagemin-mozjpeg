import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import isProgressive from 'is-progressive';
import pify from 'pify';
import test from 'ava';
import m from '.';

const fsP = pify(fs);

test('optimize a JPG', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixture.jpg'));
	const data = await m()(buf);

	t.true(data.length < buf.length);
	t.true(isJpg(data));
	t.true(isProgressive.buffer(data));
});

test('support mozjpeg options', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixture.jpg'));
	const data = await m({progressive: false})(buf);

	t.false(isProgressive.buffer(data));
});

test('skip optimizing a non-JPG file', async t => {
	const buf = await fsP.readFile(__filename);
	const data = await m()(buf);

	t.deepEqual(data, buf);
});

test('throw error when a JPG is corrupt', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixture-corrupt.jpg'));
	await t.throws(m()(buf), /Corrupt JPEG data/);
});
