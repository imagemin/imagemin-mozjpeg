# imagemin-mozjpeg [![Build Status](http://img.shields.io/travis/imagemin/imagemin-mozjpeg.svg?style=flat)](http://travis-ci.org/imagemin/imagemin-mozjpeg) [![Build status](https://ci.appveyor.com/api/projects/status/uuh7yi48erf4ykyo)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-mozjpeg)

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
