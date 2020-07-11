const { exec, spawn } = require('child_process'),
      gulp = require('gulp'),
      pump = require('pump');

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

gulp.task('default', gulp.parallel('frontend'));

gulp.task('watch', gulp.parallel('frontend:build:development', function(cb) {
    gulp.watch('src/frontend/dist/js/*.*',
        {
            delay: 1000,
            events: ['add', 'change']
        },
        gulp.series('frontend:copy'),
    );
    cb();
}));
