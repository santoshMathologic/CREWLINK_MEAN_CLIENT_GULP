/**
 *    GULP CONFIGURATION FOR CREW_LINK_MEAN_CLIENT
 *    @author santosh
 *    written on  -  17-2-2017
 * 
 * 
 */

' use strict';

var outputPath  = "public";
var inputPath   = "public_development";
var output      = outputPath + '/'; // added slash to input folder (public)
var input       = inputPath  + '/'; // added slash to output folder  (public_development)

var gulp                    = require("gulp"),
    runSequences            = require("run-sequence"),
    cssnano                 = require('gulp-cssnano'),
    merge                   = require('merge-stream'),
    fs                      = require('fs'),
    concat                  = require('gulp-concat'),
    browserSync             = require('browser-sync').create(),
    jshint                  = require('gulp-jshint'),
    less                    = require('gulp-less'),
    useref                  = require('gulp-useref');
var dir = './'+inputPath;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


gulp.task("styles",function(){

       var cssStream = gulp.src(input + 'css/**/*.css')
        .pipe(concat('css-files.css'))
        ;

        var scssStream  = gulp.src(input + "scss/**/*.scss")
                            .pipe(concat("scss.files.css"));
        
        var lessStream  = gulp.src(input + "less/**/*.less")
                            .pipe(concat("less.files.css"));


        var mergedStream = merge(cssStream,scssStream,lessStream)
        .pipe(concat('styles.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(output + 'stylesheets'));


        return mergedStream;

  


});

gulp.task('jshint', function() {
  return gulp.src(input+"/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('useref', function() {

    if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV === undefined) {
        console.log(process.env.NODE_ENV);
        return gulp.src(input + '*.html')
            .pipe(useref())
            .pipe(gulp.dest(output));
    }
    else {
                
                console.log(process.env.NODE_ENV);
        return gulp.src(input + '*.html')
        .pipe(useref())
        .pipe(gulp.dest(output));
    }

});


gulp.task('watch', ['browserSync', 'styles'], function() {
        // Reloads the browser whenever HTML or JS files change
    gulp.watch(input + "css/**/*.css", ['styles']);
    gulp.watch(input + "scss/**/*.scss", ['styles']);
    gulp.watch(input + "less/**/*.less", ['less']);
    gulp.watch(input + "**/*.html", ['useref']);
    gulp.watch(input + "js/**/*.js", ['lint']);
    
    gulp.watch(input + '**/*', browserSync.reload);
    //gulp.watch(input + 'js/**/*.js', browserSync.reload);
});



gulp.task('less', function() {
    return gulp.src([input + 'less/**/*.less'])
        .pipe(less())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(output + 'stylesheets'));
});  


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: output
        },
    });
});

gulp.task('default',function(callback){

    runSequences(['styles','browserSync', 'watch','useref','jshint','less'],callback);
    console.log("at default");

});