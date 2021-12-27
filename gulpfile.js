// Gulp package
const gulp = require('gulp');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const htmlTemplate = require('gulp-template-html');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');
const runSequence = require('run-sequence');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const beautify = require('gulp-beautify');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const wait = require('gulp-wait');
const ejs = require('gulp-ejs');
const log = require('fancy-log');
const index = require('gulp-index');
const template = require("gulp-template");
const jshint = require('gulp-jshint');
const uglifyes = require('gulp-uglify-es').default;

const AUTOPREFIXER_BROWSERS = [
	'last 2 version',
	'> 1%',
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4',
	'bb >= 10'
];

gulp.task('gtest', function () {
	console.log("try test");
});

// SASS
gulp.task('sass', done => {
	return gulp.src(['./app/scss/main-style.min.scss'])
		.pipe(sourcemaps.init())
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(wait(500))
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(sourcemaps.write('map'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

var condition = function (file) {
	return true;
}

gulp.task('beautyjs', function () {
	gulp.src('./app/js/lib/*.js')
		.pipe(gulpif(condition, uglify()))
		.pipe(gulp.dest('dist/js/'));
});

// optimizing css & JS
gulp.task('useref', function (done) {
	return gulp.src('app/*.html')
		.pipe(useref())
		// .pipe(gulpif('app/js/*.js', uglify()))
		// .pipe(gulpif('app/css/*.css', cssnano()))
		.pipe(gulp.dest('dist'));
	done();
});

gulp.task('uglifyes', function () {
	return gulp.src('dist/js/main.min.js')
		.pipe(rename('bundle.min.js'))
		.pipe(sourcemaps.init())
		.pipe(uglifyes())
		.pipe(sourcemaps.write('maps')) // Inline source maps.
		// For external source map file:
		//.pipe(sourcemaps.write('./maps')) // In this case: lib/maps/bundle.min.js.map
		.pipe(gulp.dest('dist/js/'));
});

// optimizing Images
gulp.task('images', function () {
	return gulp.src('app/images/**/*.+(png|PNG|jpg|JPG|jpeg|gif|svg|ico)')
		.pipe(cache(imagemin({
			interlaced: true,
		})))
		.pipe(gulp.dest('dist/images'));
	done();
});

gulp.task('imagesCss', function () {
	return gulp.src('app/scss/images/**/*.+(png|PNG|jpg|JPG|jpeg|gif|svg|ico)')
		.pipe(cache(imagemin({
			interlaced: true,
		})))
		.pipe(gulp.dest('dist/css/images'));
	done();
});

// dist/fonts
gulp.task('fonts', function () {
	return gulp.src('./app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
});

// build pages 
gulp.task("template", done => {
	return gulp.src("./app/page/*.html")
		.pipe(htmlTemplate("./app/template/globe.html"))
		.pipe(gulp.dest("dist"))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

// End build pages
async function menuCate() { /* task */ }
gulp.task('buildeEjs', done => {
	return gulp.src('./app/page/**/*.ejs')
		.pipe(ejs({ menuCate }).on('error', log), { async: true })
		.pipe(gulp.dest('dist'));
	done();
});

// Watch File Changes
gulp.task('watch', function () {
	gulp.watch('./app/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./app/js/**/*.js', browserSync.reload);
	gulp.watch('./app/images/*', gulp.series('images'));
	gulp.watch('./app/template/globe.html', gulp.series('template'));
	gulp.watch('./app/page/*.html', gulp.series('template'));
	console.log('Finish task');
});

// Start browserSync Server
gulp.task('browserSync', function () {
	browserSync.init({
		port: 3600,
		server: {
			baseDir: 'dist',
			directory: true
		},
		startPath: 'index.html'
	})
});

// Build sequences
gulp.task('default', function (callback) {
	runSequence(['sass', 'template', 'browserSync'], 'watch',
		callback
	)
});

// Build site-map demo
const fs = require('fs');
gulp.task('buildIndex', function () {
	return gulp
		.src(['dist/*.html'])
		.pipe(
			index({
				'prepend-to-output': () =>
					fs.readFileSync('./app/index-partials/index-front-matter.html'),
				'append-to-output': () =>
					fs.readFileSync('./app/index-partials/index-end-matter.html'),
				title: 'Pages List',
				pathDepth: 1,
				'relativePath': './',
				'outputFile': './sitemap.html',
				'section-template': (sectionContent) => `<section class="index__section">
        ${sectionContent}</section>
        `,
				'section-heading-template': (heading) => `<h2 class="index__section-heading">${heading}</h2>
        `,
				'list-template': (listContent) => `<ul class="index__list">
        ${listContent}</ul>
        `,
				'item-template': (
					filepath,
					filename
				) => `<li class="index__item"><a class="index__item-link" target="_blank" href="${filename}">${filename}</a></li>
                    `
			})
		)
		.pipe(gulp.dest('./dist'));
});
// End build site-map

// Task run
gulp.task('start', gulp.parallel(
	'sass',
	'useref',
	'uglifyes',
	'template',
	'watch',
	'browserSync'
));
//End task - Clone Redbiz