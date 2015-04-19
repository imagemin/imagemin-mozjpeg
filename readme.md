# imagemin-mozjpeg [![Build Status](https://travis-ci.org/imagemin/imagemin-mozjpeg.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-mozjpeg) [![Build status](https://ci.appveyor.com/api/projects/status/uuh7yi48erf4ykyo?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-mozjpeg)

> mozjpeg imagemin plugin


## Install

```
$ npm install --save imagemin-mozjpeg
```


## Usage

```js
var Imagemin = require('imagemin');
var imageminMozjpeg = require('imagemin-mozjpeg');

new Imagemin()
	.src('images/*.jpg')
	.dest('build/images')
	.use(imageminMozjpeg({quality: 80}))
	.run();
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('default', function () {
	return gulp.src('images/*.jpg')
		.pipe(imageminMozjpeg({quality: 80})())
		.pipe(gulp.dest('build/images'));
});
```


## API

### imageminMozjpeg(options)

#### options.quality

Type: `number`

Compression quality. Min and max are numbers in range 0 (worst) to 100 (perfect).

#### options.progressive

Type: `boolean`
Default: `true`

`false` creates baseline JPEG file.

#### options.targa

Type: `boolean`
Default: `false`

Input file is Targa format (usually not needed).

#### options.revert

Type: `boolean`
Default: `false`

Revert to standard defaults instead of mozjpeg defaults.

#### options.fastcrush

Type: `boolean`  
Default: `false`

Disable progressive scan optimization.

#### options.dcScanOpt

Type: `number`  
Default: `1`

Set DC scan optimization mode.

* `0` One scan for all components
* `1` One scan per component
* `2` Optimize between one scan for all components and one scan for 1st component plus one scan for remaining components

#### options.notrellis

Type: `boolean`  
Default: `false`

Disable [trellis optimization](https://en.wikipedia.org/wiki/Trellis_quantization).

#### options.notrellisDC

Type: `boolean`  
Default: `false`

Disable trellis optimization of DC coefficients.

#### options.tune

Type: `string`  
Default: `hvs-psnr`

Set trellis optimization method. Available methods: `psnr`, `hvs-psnr`, `ssim` and `ms-ssim`

#### options.noovershoot

Type: `boolean`  
Default: `false`

Disable black-on-white deringing via overshoot.

#### options.arithmetic

Type: `boolean`  
Default: `false`

Use [arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding).

#### options.quantTable

Type: `number`

Use predefined quantization table.

* `0` JPEG Annex K
* `1` Flat
* `2` Custom, tuned for MS-SSIM
* `3` ImageMagick table by N. Robidoux
* `4` Custom, tuned for PSNR-HVS
* `5` Table from paper by Klein, Silverstein and Carney

#### options.smooth

Type: `number`

Set the strength of smooth dithered input. (1...100)

#### options.maxmemory

Type: `number`

Set the maximum memory to use in kbytes.


## License

MIT © [imagemin](https://github.com/imagemin)
