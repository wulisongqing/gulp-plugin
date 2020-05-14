const gulp = require('gulp')
const msq = require('./plugin/gulp-msq')

// 这个是gulp3.9 定义任务的语法
gulp.task('default', () => {
    let s = gulp.src('./static/js/**/*')
        .pipe(msq())
        .pipe(gulp.dest('./build'))

    return s
})
