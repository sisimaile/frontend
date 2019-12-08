const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// compile scss into css
function style() {
    //1. find my scss file
    return gulp.src('./scss/**/*.scss')
    //2. pass that file through the sass compiler
    .pipe(sass().on('error', sass.logError))
    //3. where do I save the compiled css?
    .pipe(gulp.dest('./css'))
    //4. stream changes to all browser
    .pipe(browserSync.stream());
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);                  /*will refresh the page automatically once it detect any change*/
    gulp.watch('./*.html').on('change', browserSync.reload); /*same goes for html and js*/
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;