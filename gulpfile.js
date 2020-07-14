const { exec, spawn } = require('child_process'),
      gulp = require('gulp'),
      pump = require('pump'),
      sass = require('gulp-sass');

gulp.task('frontend:copy', function(cb) {
    pump([
        gulp.src('src/frontend/dist/js/*.*'),
        gulp.dest('src/digi_edit/static'),
    ], cb);
});

gulp.task('frontend:build:development', function(cb) {
    const builder = spawn('yarn', ['build', '--mode development', '--watch', '--no-clean'], {
        cwd: 'src/frontend',
        stdio: 'inherit',
    });
    builder.on('exit', cb);
});

gulp.task('frontend:build:production', function(cb) {
    const builder = spawn('yarn', ['build', '--mode production'], {
        cwd: 'src/frontend',
        stdio: 'inherit',
    });
    builder.on('exit', cb);
});

gulp.task('frontend', gulp.series('frontend:build:production', 'frontend:copy'));

gulp.task('theme', function(cb) {
    pump([
        gulp.src('src/theme/theme.scss'),
        sass(),
        gulp.dest('src/digi_edit/static'),
    ], cb);
});

gulp.task('css:sanitize', (cb) => {
    pump([
        gulp.src('node_modules/sanitize.css/sanitize.css'),
        gulp.dest('src/digi_edit/static'),
    ], cb);
});

gulp.task('default', gulp.parallel('theme', 'css:sanitize', 'frontend'));

gulp.task('watch', gulp.parallel('frontend:build:development', 'css:sanitize', 'theme', function(cb) {
    gulp.watch('src/theme/**/*.*', gulp.series('theme'));
    gulp.watch('src/frontend/dist/js/*.*',
        {
            delay: 1000,
            events: ['add', 'change']
        },
        gulp.series('frontend:copy'),
    );
    cb();
}));
