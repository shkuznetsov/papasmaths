var
	fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	filter = require('gulp-filter'),
	uglify = require('gulp-uglify'),
	gzip = require('gulp-gzip'),
	sass = require('gulp-sass'),
	mincss = require('gulp-minify-css'),
	minhtml = require('gulp-minify-html'),
	uglifyhtml = require('gulp-uglify-inline'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	gm = require('gulp-gm'),
	replace = require('gulp-replace'),
	bump = require('gulp-bump'),
	git = require('gulp-git'),
	s3 = require('gulp-s3'),
	pkg = JSON.parse(fs.readFileSync('package.json')),
	config = JSON.parse(fs.readFileSync('config.json')),
	args = require('yargs').argv,
	options = {
		paths: {
			html: {
				watch: 'src/**/*.html',
				input: 'src/index.html',
				output: {
					concat: 'dist/debug.html',
					min: 'dist/index.html',
					gz: 'dist/index.html.gz'
				}
			},
			css: {
				watch: 'src/css/**/*.scss',
				input: 'src/css/main.scss',
				output: {
					concat: 'dist/css/build.css',
					min: 'dist/css/build.min.css',
					gz: 'dist/css/build.min.css.gz'
				}
			},
			js: {
				watch: 'src/js/**/*.js',
				input: 'src/js/**/*.js',
				output: {
					concat: 'dist/js/build.js',
					min: 'dist/js/build.min.js',
					gz: 'dist/js/build.min.js.gz'
				}
			},
			img: {
				input: 'src/img/**',
				output: 'dist/img/'
			}
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
		.pipe(gulp.dest('./'))
		.pipe(uglify(options.uglify))
		.pipe(rename(options.paths.js.output.min))
		.pipe(gulp.dest('./'))
		.pipe(gzip())
		.pipe(rename(options.paths.js.output.gz))
		.pipe(gulp.dest('./'));
});

gulp.task('build-css', function()
{
    return gulp.src(options.paths.css.input)
		.pipe(sass())
		.pipe(rename(options.paths.css.output.concat))
		.pipe(gulp.dest('./'))
		.pipe(mincss())
		.pipe(rename(options.paths.css.output.min))
		.pipe(gulp.dest('./'))
		.pipe(gzip())
		.pipe(rename(options.paths.css.output.gz))
		.pipe(gulp.dest('./'));
});

gulp.task('build-html', function()
{
	return gulp.src(options.paths.html.input)
		.pipe(replace('<% title %>', pkg.title))
		.pipe(replace('<% description %>', pkg.description))
		.pipe(replace('<% author %>', pkg.author.name + ', ' + pkg.author.email + ', ' + pkg.author.url))
		.pipe(replace('<% version %>', pkg.version))
		.pipe(replace('<% repo %>', pkg.repository.url))
		.pipe(replace('<% ga %>', config.ga))
		.pipe(rename(options.paths.html.output.concat))
		.pipe(gulp.dest('./'))
		.pipe(replace('build.js', 'build.min.js'))
		.pipe(replace('build.css', 'build.min.css'))
		.pipe(minhtml(options.minhtml))
		.pipe(uglifyhtml(options.uglify))
		.pipe(rename(options.paths.html.output.min))
		.pipe(gulp.dest('./'))
		.pipe(gzip())
		.pipe(rename(options.paths.html.output.gz))
		.pipe(gulp.dest('./'));
});

gulp.task('build-img', function()
{
	var objects_filter = filter('**/objects/*');

	return gulp.src(options.paths.img.input)
		.pipe(objects_filter)
		.pipe(gm(function ( gmfile ) { return gmfile.resize(160, 160).background('transparent').gravity('Center').extent(160, 160); }))
		.pipe(objects_filter.restore())
		.pipe(imagemin({use: [pngquant({quality: '0-70'})]}))
		.pipe(gulp.dest(options.paths.img.output));
});

gulp.task('build', ['build-js', 'build-css', 'build-html']);

gulp.task('watch', function()
{
	gulp.watch([options.paths.js.watch, options.paths.css.watch, options.paths.html.watch], ['build']);
});

gulp.task('bump', function ( cb )
{
	var version = args['ver'];

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
		'dist/**/*.gz',
		'dist/**/*.png'
	];

	var credentials = JSON.parse(fs.readFileSync('aws.json')),
		opt = {headers: {'Cache-Control': 'max-age=' + options.s3.ttl}};

    return gulp.src(src).pipe(s3(credentials, opt));
});
