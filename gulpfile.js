/*global require*/
'use strict';

var gulp = require("gulp"),
    // scss -> css
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    // babel -> js
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    // images
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    // markup -> twig
    twig = require('gulp-twig'), // Decided to use twig instead of pug, because already familiar with it
    // fileinclude = require('gulp-file-include'),
    // include = require('gulp-tag-include-html'),
    // resources
    del = require('del'),
    notify = require("gulp-notify"),
    // data = require('gulp-data'),
    useref = require('gulp-useref'), // concatenates CSS and Js files into a single file

    sourcemaps = require("gulp-sourcemaps"),
    // fs = require('fs'),
    browserSync = require("browser-sync").create();


var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: "src/styles/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "dist/styles"
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/scripts'
    },
    // Easily add additional paths
    markups: {
        // src: 'src/**/*.html',
        src: 'src/views/**/*.twig',
        dest: 'dist/'
    },
    images: {
        src: 'src/images/**/*.+(png|jpg|gif|svg)',
        dest: 'dist/images'
    },
    fonts: {
        src: 'src/fonts/**/*',
        dest: 'dist/fonts'
    },
    data: {
        src: 'src/data/**/*.twig.json'
    }
};

//////////////////////////////////////////CLEAN THE DIST
// const clean = () => del(['dist']);


//////////////////////////////////////////GREET
function greet() {
    console.log('Hello developers!!!');
}

//////////////////////////////////////////COPY ALL HTML TO DIST
function markup() {
    return gulp
        .src(paths.markups.src)
        // // //-> tag-include-html
        // .pipe(include())
        //     .pipe(include({
        //     begin:'<%',
        //     end:'%>'
        // }))
        // // //-> end-tag-include-html
        // .pipe(data(function(file) {
        //     return JSON.parse(fs.readFileSync(paths.data + path.basename(file.path) + '.json'));
        // }))
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        .pipe(gulp.dest(paths.markups.dest))
        .pipe(notify('listening markups...'))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}

//////////////////////////////////////////COMPILE SCSS
function style() {
    return gulp
        .src(paths.styles.src)
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(), cssnano()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(notify('loading styles...'))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}

//////////////////////////////////////////COMPILE JS
function script() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
    //   .pipe(babel())
        .pipe(babel({
            presets: ['@babel/env']
        }))
      .pipe(uglify())
    //.pipe(concat('index.min.js'))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(notify('loading scripts...'))
      .pipe(browserSync.stream());
  }

//////////////////////////////////////////MINIMIZE IMAGES
// Copies the assets into the dist folder
function image() {
    return gulp
        .src(paths.images.src)
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
          })))
        // Minimize images
        // .pipe(imagemin({
        //     interlaced: true,
        //     progressive: true,
        //     optimizationLevel: 5,
        //     svgoPlugins: [
        //         {
        //             removeViewBox: true
        //         }
        //     ]
        // }))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(notify('reducing images...'))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}

//////////////////////////////////////////COPIES FONTS
function font() {
    return gulp
        .src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(notify('copying fonts...'))
        // Add browsersync stream pipe after compilation
        .pipe(browserSync.stream());
}


// A simple task to reload the page
function reload(done) {
    browserSync.reload();
    done();
}

// Add browsersync initialization at the start of the watch task
function watch() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./dist"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.scripts.src, script);
    gulp.watch(paths.images.src, image);
    gulp.watch(paths.fonts.src, font);
    // gulp.watch(paths.markups.src, markup);
    gulp.watch(paths.markups.src, markup).on('change', browserSync.reload);


    // gulp.watch(paths.markups.src, markup);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object

    // gulp.watch("src/*.html", reload);
}
 
// We don't have to expose the reload function
// It's currently only useful in other functions

    
// Don't forget to expose the task!
exports.watch = watch

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
exports.script = script;
exports.image = image;
exports.font = font;
exports.markup = markup;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
// var build = gulp.parallel(style, script, watch);
var css = gulp.parallel(style, watch);
var js = gulp.parallel(script, watch);
var img = gulp.parallel(image, watch);
var dev = gulp.parallel(style, markup, script, image, font, watch);

/*
 * You can still use `gulp.task` to expose tasks
 */
//gulp.task('build', build);
 
/*
 * Define default task that can be called by just running `gulp` from cli
 * To execute: gulp + name task 
 * -> gulp css
 */

// gulp.task('default', build);
gulp.task('css', css);
gulp.task('js', js);
gulp.task('img', img);
gulp.task('dev', dev);

