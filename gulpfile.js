const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('transformTest', function (cb) {
  return gulp.src('test/**/*')
             .pipe(babel({presets: ['es2015']}))
             .pipe(gulp.dest('__test__'))
})
gulp.task('release', function (cb) {
  return gulp.src('src/**/*')
             .pipe(babel({presets: ['es2015']}))
             .pipe(gulp.dest('lib'))
})

gulp.task('default', ['transformTest', 'release'])
