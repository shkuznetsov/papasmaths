var
	fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	gzip = require('gulp-gzip'),
	sass = require('gulp-sass'),
	mincss = require('gulp-minify-css'),
	replace = require('gulp-replace'),
	config = JSON.parse(fs.readFileSync('gulpconfig.json')),
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
			remote:
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

gulp.task('bump', function (cb)
{
	var version = args['version'],
		message = 'Release ' + version;

	if (typeof version === 'undefined')
	{
		cb();
	}
	else
	{
		gulp.src('package.json')
			.pipe(bump({version: version}))
			.pipe(gulp.dest('./'))
			.pipe(packageFilter.restore())
			//.pipe(git.commit(message))
			.on('end', function () {
				git.commit(message, function () {
					git.tag('v' + version, message, {}, function () {
						git.push(config.git.remote, config.git.branch, {args: '--tags'}, cb);
					});
				});
			});
	}
});