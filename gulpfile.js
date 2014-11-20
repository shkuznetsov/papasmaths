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
	template = require('gulp-template'),
	include = require('gulp-include'),
	bump = require('gulp-bump'),
	git = require('gulp-git'),
	s3 = require('gulp-s3'),
	pkg = JSON.parse(fs.readFileSync('package.json')),
	config = JSON.parse(fs.readFileSync('config.json')),
	args = require('yargs').argv,
	options = {
		paths: {
			html: {
				watch: ['src/*.html', 'src/*.json'],
				input: ['src/index.html', 'src/library.html', 'src/help.html', 'src/about.html']
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

gulp.task('build-js', function ( )
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

gulp.task('build-css', function ( )
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

gulp.task('build-html', function ( )
{
	var library = JSON.parse(fs.readFileSync('src/library.json'));

	return gulp.src(options.paths.html.input)
		.pipe(include())
		.pipe(template({pkg: pkg, config: config, library: library}))
		.pipe(gulp.dest('dist/'))
		.pipe(replace(path.basename(options.paths.js.output.concat), path.basename(options.paths.js.output.min)))
		.pipe(replace(path.basename(options.paths.css.output.concat), path.basename(options.paths.css.output.min)))
		.pipe(minhtml(options.minhtml))
		.pipe(uglifyhtml(options.uglify))
		.pipe(gzip())
		.pipe(gulp.dest('dist/'));
});

gulp.task('build-img', function ( )
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

gulp.task('watch', ['build'], function ( )
{
	gulp.watch([options.paths.js.watch, options.paths.css.watch, options.paths.html.watch], ['build']);
});

gulp.task('default', ['build', 'watch']);

gulp.task('bump', function ( cb )
{
	if (args['ver'])
	{
		var params = {version: args['ver']};

		gutil.log("Bumping to version: " + gutil.colors.green(args['ver']));
	}
	else if (args['major'])
	{
		var params = {type: 'major'};

		gutil.log("Bumping " + gutil.colors.green('major') + " version");
	}
	else if (args['minor'])
	{
		var params = {type: 'minor'};

		gutil.log("Bumping " + gutil.colors.green('minor') + " version");
	}
	else
	{
		gutil.log("Bumping " + gutil.colors.green('bugfix') + " version");
	}

	gulp.src('package.json')
		.pipe(bump(params))
		.pipe(gulp.dest('./'))
		.on('end', function ( )
		{
			pkg = JSON.parse(fs.readFileSync('package.json'));

			var message = 'Release ' + pkg.version,
				tag = options.git.tagPrefix + pkg.version.replace(/\./g, '-'),
				exec = function ( cmd, success, next_step )
				{
					require('child_process').exec(cmd, function( err, stdout, stderr )
					{
						if (err)
						{
							cb(stdout + stderr);
						}
						else
						{
							gutil.log(success);
							next_step();
						}
					});
				};

			exec('git commit -m "' + message + '" package.json', 'Commited successfully', function ( )
			{
				exec('git tag -m "' + message + '" ' + tag, 'Tagged successfully', function ( )
				{
					exec('git push ' + options.git.remote + ' ' + options.git.branch + ' --tags', 'Pushed successfully', cb);
				});
			});
		});
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
