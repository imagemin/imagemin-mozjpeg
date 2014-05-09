# imagemin-mozjpeg [![Build Status](https://travis-ci.org/kevva/imagemin-mozjpeg.svg?branch=master)](https://travis-ci.org/kevva/imagemin-mozjpeg)

> mozjpeg image-min plugin

## Install

```bash
$ npm install --save imagemin-mozjpeg
```

## Usage

```js
var Imagemin = require('image-min');
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

MIT © [Kevin Mårtensson](https://github.com/kevva)
