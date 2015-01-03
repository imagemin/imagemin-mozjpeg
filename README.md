# imagemin-mozjpeg [![Build Status](http://img.shields.io/travis/imagemin/imagemin-mozjpeg.svg?style=flat)](http://travis-ci.org/imagemin/imagemin-mozjpeg) [![Build status](https://ci.appveyor.com/api/projects/status/uuh7yi48erf4ykyo?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-mozjpeg)

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
	.src('images/*.jpg')
	.dest('build/images')
	.use(mozjpeg({ quality: '65-80' }));

imagemin.run(function (err, files) {
	if (err) {
		throw err;
	}

	console.log('Files optimized successfully!'); 
});
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var mozjpeg = require('imagemin-mozjpeg');

gulp.task('default', function () {
	return gulp.src('images/*.jpg')
		.pipe(mozjpeg({ quality: '65-80' })())
		.pipe(gulp.dest('build/images'));
});
```


## Options

### fastcrush

Type: `Boolean`  
Default: `false`

Disable progressive scan optimization.

### quality

Type: `String`  
Default: `undefined`

Compression quality. Min and max are numbers in range 0 (worst) to 100 (perfect).


## License

MIT © [imagemin](https://github.com/imagemin)
