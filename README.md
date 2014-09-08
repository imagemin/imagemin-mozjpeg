# imagemin-mozjpeg [![Build Status](https://travis-ci.org/imagemin/imagemin-mozjpeg.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-mozjpeg)

> mozjpeg imagemin plugin


## Install

```bash
$ npm install --save imagemin-mozjpeg
```


## Usage

```js
var Imagemin = require('imagemin');
var mozjpeg = require('imagemin-mozjpeg');

var imagemin = new Imagemin()
	.src('foo.jpg')
	.dest('foo-optimized.jpg')
	.use(mozjpeg());

imagemin.optimize();
```


## Options

### fastcrush

Type: `Boolean`  
Default: `false`

Disable progressive scan optimization.


## License

MIT © [imagemin](https://github.com/imagemin)
