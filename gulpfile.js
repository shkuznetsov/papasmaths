var
	fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	gzip = require('gulp-gzip'),
	sass = require('gulp-sass'),
	mincss = require('gulp-minify-css'),
	replace = require('gulp-replace'),
	bump = require('gulp-bump'),
	git = require('gulp-git'),
	s3 = require('gulp-s3'),
	pkg = JSON.parse(fs.readFileSync('package.json')),
	args = require('yargs').argv,
	options = {
		paths: {
			html: {
				base: 'www/',
				input: 'www/app.html',
				output: 'index.html'
			},
			css: {
				base: 'www/css/',
				input: 'www/css/main.scss',
				output: {
					concat: 'build.css',
					min: 'build.min.css',
					gz: 'build.min.css.gz'
				}
			},
			js: {
				base: 'www/js/',
				input: [
					'www/js/libs/zepto.js',
					'www/js/libs/purl.js',
					'www/js/task.js'
				],
				output: {
					concat: 'build.js',
					min: 'build.min.js',
					gz: 'build.min.js.gz'
				}
			},
		},
		uglify: {
			preserveComments: 'some',
			output: {
				beautify: false,
				ascii_only: true,
				quote_keys: true
			}
		},
		git: {
			remote: 'origin',
			branch: 'master',
			tagPrefix: 'v-'
		},
		s3: {
			ttl: 300
		}
	};

gulp.task('build-js', function()
{
    return gulp.src(options.paths.js.input)
		.pipe(concat(options.paths.js.output.concat))
		.pipe(gulp.dest(options.paths.js.base))
		.pipe(uglify(options.uglify))
		.pipe(rename(options.paths.js.output.min))
		.pipe(gulp.dest(options.paths.js.base))
		.pipe(gzip())
		.pipe(rename(options.paths.js.output.gz))
		.pipe(gulp.dest(options.paths.js.base));
});

gulp.task('build-css', function()
{
    return gulp.src(options.paths.css.input)
		.pipe(sass())
		.pipe(rename(options.paths.css.output.concat))
		.pipe(gulp.dest(options.paths.css.base))
		.pipe(mincss())
		.pipe(rename(options.paths.css.output.min))
		.pipe(gulp.dest(options.paths.css.base))
		.pipe(gzip())
		.pipe(rename(options.paths.css.output.gz))
		.pipe(gulp.dest(options.paths.css.base));
});

gulp.task('build-html', function()
{
	return gulp.src(options.paths.html.input)
		.pipe(replace(options.paths.js.output.concat, options.paths.js.output.min + '?version=' + pkg.version))
		.pipe(replace(options.paths.css.output.concat, options.paths.css.output.min + '?version=' + pkg.version))
		.pipe(rename(options.paths.html.output))
		.pipe(gulp.dest(options.paths.html.base));
});

gulp.task('build', ['build-js', 'build-css', 'build-html']);

gulp.task('watch', function()
{
	var js = path.join(options.paths.js.base, '**', '*'),
	    css = path.join(options.paths.css.base, '**', '*');

	gulp.watch([js, css], ['build']);
});

gulp.task('bump', function ( cb )
{
	var version = args['newver'];

	if (typeof version != 'undefined')
	{
		var message = 'Release ' + version,
			tag = options.git.tagPrefix + version.replace(/\./g, '-');

		return gulp.src('package.json')
			.pipe(bump({version: version}))
			.pipe(gulp.dest('./'))
			.pipe(git.commit(message))
			.on('end', function ( )
			{
				return this.pipe(git.tag(tag, message, {}, function ( )
				{
					git.push(options.git.remote, options.git.branch, {args: '--tags'}).end();
				}));
			});
	}
	else
	{
		cb();
	}
});

gulp.task('upload', ['build'], function ( )
{
	var src =
	[
		'www/**/*.gz',
		'www/**/*.png',
		'www/**/index.html'
	];

	var credentials = JSON.parse(fs.readFileSync('aws.json')),
		opt = {headers: {'Cache-Control': 'max-age=' + options.s3.ttl}};

    return gulp.src(src).pipe(s3(credentials, opt));
});

gulp.task('release', ['build', 'bump', 'upload']);
