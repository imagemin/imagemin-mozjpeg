# imagemin-mozjpeg [![Build Status](http://img.shields.io/travis/imagemin/imagemin-mozjpeg.svg?style=flat)](http://travis-ci.org/imagemin/imagemin-mozjpeg) [![Build status](https://ci.appveyor.com/api/projects/status/uuh7yi48erf4ykyo?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-mozjpeg)

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
	.use(imageminMozjpeg({quality: '65-80'}))
	.run();
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('default', function () {
	return gulp.src('images/*.jpg')
		.pipe(imageminMozjpeg({quality: '65-80'})())
		.pipe(gulp.dest('build/images'));
});
```


## API

### imageminMozjpeg(options)

#### options.fastcrush

Type: `boolean`  
Default: `false`

Disable progressive scan optimization.

#### options.quality

Type: `string`

Compression quality. Min and max are numbers in range 0 (worst) to 100 (perfect).


## License

MIT © [imagemin](https://github.com/imagemin)
