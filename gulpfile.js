//================================================
// Dependencies
//================================================

const gulp = require('gulp')
const less = require('gulp-less')

//================================================
// Compile Stylesheets Task
//================================================

gulp.task(`compile:less`, function(callback) {
   return gulp.src(`styles/index.less`)
      .pipe(less({ compress : true }))
      .pipe(gulp.dest(`dist`))
})

//================================================
// Default Task
//================================================

gulp.task('default', ['compile:less'], function() {
   console.log('Build process complete, watching source files for changes...')

   const watcher = gulp.watch('styles/**/*.less', ['compile:less'])
   watcher.on('change', function(event) {
     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })
})
