# imagemin-mozjpeg [![Build Status](https://travis-ci.org/imagemin/imagemin-mozjpeg.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-mozjpeg) [![Build status](https://ci.appveyor.com/api/projects/status/uuh7yi48erf4ykyo?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-mozjpeg)

> mozjpeg imagemin plugin


## Install

```
$ npm install --save imagemin-mozjpeg
```


## Usage

```js
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

imagemin('images/*.jpg', 'build/images', {use: [imageminMozjpeg()]}).then(() => {
	console.log('Images optimized');
});
```


## API

### imageminMozjpeg(options)(buffer)

Returns a promise for a buffer.

#### options

##### quality

Type: `number`

Compression quality. Min and max are numbers in range 0 (worst) to 100 (perfect).

##### progressive

Type: `boolean`
Default: `true`

`false` creates baseline JPEG file.

##### targa

Type: `boolean`
Default: `false`

Input file is Targa format (usually not needed).

##### revert

Type: `boolean`
Default: `false`

Revert to standard defaults instead of mozjpeg defaults.

##### fastcrush

Type: `boolean`  
Default: `false`

Disable progressive scan optimization.

##### dcScanOpt

Type: `number`  
Default: `1`

Set DC scan optimization mode.

* `0` One scan for all components
* `1` One scan per component
* `2` Optimize between one scan for all components and one scan for 1st component plus one scan for remaining components

##### notrellis

Type: `boolean`  
Default: `false`

Disable [trellis optimization](https://en.wikipedia.org/wiki/Trellis_quantization).

##### notrellisDC

Type: `boolean`  
Default: `false`

Disable trellis optimization of DC coefficients.

##### tune

Type: `string`  
Default: `hvs-psnr`

Set trellis optimization method. Available methods: `psnr`, `hvs-psnr`, `ssim` and `ms-ssim`

##### noovershoot

Type: `boolean`  
Default: `false`

Disable black-on-white deringing via overshoot.

##### arithmetic

Type: `boolean`  
Default: `false`

Use [arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding).

##### quantTable

Type: `number`

Use predefined quantization table.

* `0` JPEG Annex K
* `1` Flat
* `2` Custom, tuned for MS-SSIM
* `3` ImageMagick table by N. Robidoux
* `4` Custom, tuned for PSNR-HVS
* `5` Table from paper by Klein, Silverstein and Carney

##### smooth

Type: `number`

Set the strength of smooth dithered input. (1...100)

##### maxmemory

Type: `number`

Set the maximum memory to use in kbytes.

#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
