var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    pump = require('pump');

gulp.task('css:theme', function(cb) {
    pump([
        gulp.src('theme/app.scss'),
        sass({
            includePaths: ['node_modules/foundation-sites/scss']
        }),
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        gulp.dest('editor/static/editor/css')
    ], cb);
});

gulp.task('css:editor', function(cb) {
    pump([
        gulp.src(['node_modules/tei-editor/dist/app.css']),
        concat('tei-editor.css'),
        gulp.dest('editor/static/editor/css')
    ], cb);
    cb();
})

gulp.task('css', gulp.parallel('css:theme', 'css:editor'));

gulp.task('js:editor', function(cb) {
    pump([
        gulp.src([
            'node_modules/tei-editor/dist/app.js'
        ]),
        concat('tei-editor.js'),
        gulp.dest('editor/static/editor/js')
    ], cb);
    cb();
});

gulp.task('js', gulp.parallel('js:editor'));

gulp.task('default', gulp.parallel('css', 'js'));

gulp.task('watch', gulp.series('default', function(cb) {
    gulp.watch('theme/**/*.scss', gulp.series('css:theme'));
    cb();
}))
