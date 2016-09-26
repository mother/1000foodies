//================================================
// Dependencies
//================================================

var browserify = require('browserify')
const gulp = require('gulp')
const less = require('gulp-less')
var source = require('vinyl-source-stream')

//================================================
// Browserify
//================================================

gulp.task(`compile:scripts`, function() {
   console.log('Compiled Scripts')

    return browserify('./scripts/index.js').bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./dist/'))
})

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

gulp.task('default', ['compile:less', 'compile:scripts'], function() {
   console.log('Build process complete, watching source files for changes...')

   const lessWatcher = gulp.watch('styles/**/*.less', ['compile:less'])
   lessWatcher.on('change', function(event) {
     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
  })

   const scriptsWatcher = gulp.watch('scripts/**/*.js', ['compile:scripts'])
   scriptsWatcher.on('change', function(event) {
      console.log('Scripts Updated', event)
   })
})
