var gulp = require("gulp"),
    uglify = require("gulp-uglifyjs"),
    jshint = require("gulp-jshint"),
    minifyCSS = require("gulp-minify-css"),
    prefix = require("gulp-autoprefixer"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    connect = require("gulp-connect");

function p(path) {
    return __dirname + (path.charAt(0) === "/" ? "" : "/") + path;
}

gulp.task("uglify", function () {
    gulp.src(p("src/js/alertify.js"))
        .pipe(uglify({outSourceMap: true}))
        .pipe(gulp.dest(p("dist/js")))
        .pipe(connect.reload());
});

gulp.task("serve", function () {
    connect.server({
        root: p("/"),
        port: 9000,
        livereload: true
    });
});

gulp.task("css-min", function () {

    gulp.src([
        p("src/css/core.css"),
        p("src/css/themes/default/**/*.css"),
    ])
        .pipe(concat("alertify.css"))
        .pipe(minifyCSS())
        .pipe(prefix("last 2 version", "> 1%"))
        .pipe(gulp.dest(p("dist/css")));

});

gulp.task("watch", ["serve"], function () {
    gulp.watch([
        p("index.html"), p("assets/css/**/*.css"), p("assets/js/**/*.js"), p("src/**/*")
    ], ["build"]);
});

gulp.task("test", function () {

    return gulp
        .src(p("test/runner.html"))
        .pipe(mochaPhantomJS());

});

gulp.task("build", ["uglify", "css-min"]);
gulp.task("default", ["watch"]);