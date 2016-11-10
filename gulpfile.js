const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('default', function (cb) {
  return gulp.src('src/**')
             .pipe(babel({presets: ['es2015']}))
             .pipe(gulp.dest('lib'))
})
