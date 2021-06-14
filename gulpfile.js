const { spawn } = require('child_process'),
      gulp = require('gulp'),
      pump = require('pump'),
      replace = require('gulp-replace'),
      clean = require('gulp-clean'),
      fs = require('fs'),
      hash = require('gulp-hash-filename'),
      sass = require('gulp-dart-sass');

gulp.task('ui:patch', function(cb) {
    let chunkVendorsHash = '';
    let appHash = '';
    let themeHash = '';
    fs.readdirSync('src/digi_edit/static/app').forEach((filename) => {
        const chunkVendorsMatch = filename.match(/chunk-vendors\.([a-zA-Z0-9]+)?\.js/);
        if (chunkVendorsMatch) {
            chunkVendorsHash = chunkVendorsMatch[1];
        }
        const appMatch = filename.match(/app\.([a-zA-Z0-9]+)?\.js/);
        if (appMatch) {
            appHash = appMatch[1];
        }
    });
    fs.readdirSync('src/digi_edit/static').forEach((filename) => {
        const themeMatch = filename.match(/theme\.([a-zA-Z0-9]+)?\.css/);
        if (themeMatch) {
            themeHash = themeMatch[1];
        }
    });
    pump([
        gulp.src('src/digi_edit/templates/ui.jinja2'),
        replace(/static\/theme(\.[a-zA-Z0-9]+)?\.css/, 'static/theme.' + themeHash + '.css'),
        replace(/chunk-vendors(\.[a-zA-Z0-9]+)?\.js/, 'chunk-vendors.' + chunkVendorsHash + '.js'),
        replace(/app(\.[a-zA-Z0-9]+)?\.js/, 'app.' + appHash + '.js'),
        gulp.dest('src/digi_edit/templates')
    ], cb);
});

gulp.task('frontend:copy.clean', function(cb) {
    pump([
        gulp.src('src/digi_edit/static/app'),
        clean()
    ], cb);
});

gulp.task('frontend:copy', function(cb) {
    pump([
        gulp.src('src/frontend/dist/js/*.*'),
        gulp.dest('src/digi_edit/static/app'),
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

gulp.task('frontend', gulp.series('frontend:build:production', 'frontend:copy.clean', 'frontend:copy'));

gulp.task('theme:build', function(cb) {
    pump([
        gulp.src('src/theme/theme.scss'),
        sass(),
        hash({
            format: '{name}.{hash}{ext}',
        }),
        gulp.dest('src/digi_edit/static'),
    ], cb);
});

gulp.task('theme:clean', function(cb) {
    pump([
        gulp.src('src/digi_edit/static/theme.*.css'),
        clean()
    ], cb);
})

gulp.task('theme', gulp.series('theme:clean', 'theme:build'))

gulp.task('css:sanitize', (cb) => {
    pump([
        gulp.src('node_modules/sanitize.css/sanitize.css'),
        gulp.dest('src/digi_edit/static'),
    ], cb);
});

gulp.task('default', gulp.series(gulp.parallel('theme', 'css:sanitize', 'frontend'), 'ui:patch'));

gulp.task('watch', gulp.parallel('frontend:build:development', 'css:sanitize', 'theme', function(cb) {
    gulp.watch('src/theme/**/*.*', gulp.series('theme', 'ui:patch'));
    gulp.watch('src/frontend/dist/js/*.*',
        {
            delay: 1000,
            events: ['add', 'change']
        },
        gulp.series('frontend:copy', 'ui:patch'),
    );
    cb();
}));
