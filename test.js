import {promises as fs} from 'node:fs';
import isJpg from 'is-jpg';
import isProgressive from 'is-progressive';
import test from 'ava';
import imageminMozjpeg from './index.js';

test('optimize a JPG', async t => {
	const buffer = await fs.readFile(new URL('fixture.jpg', import.meta.url));
	const data = await imageminMozjpeg()(buffer);

	t.true(data.length < buffer.length);
	t.true(isJpg(data));
	t.true(isProgressive.buffer(data));
});

test('support mozjpeg options', async t => {
	const buffer = await fs.readFile(new URL('fixture.jpg', import.meta.url));
	const data = await imageminMozjpeg({progressive: false})(buffer);

	t.false(isProgressive.buffer(data));
});

test('skip optimizing a non-JPG file', async t => {
	const buffer = await fs.readFile(new URL(import.meta.url));
	const data = await imageminMozjpeg()(buffer);

	t.deepEqual(data, buffer);
});

test('throw error when a JPG is corrupt', async t => {
	const buffer = await fs.readFile(new URL('fixture-corrupt.jpg', import.meta.url));
	await t.throwsAsync(async () => {
		await imageminMozjpeg()(buffer);
	}, {message: /Corrupt JPEG data/});
});
