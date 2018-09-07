var gulp=require('gulp')
var sass=require('gulp-sass')
var browser=require('browser-sync')
var ts=require('gulp-typescript')
var tsProject=ts.createProject('tsconfig.json')//Конфиги для компиляции typescript

//Для переваривания scss в css
gulp.task('sass',()=>{
	return gulp.src('./src/scss/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('./app/css'))
	.pipe(browser.reload({
		stream:true
	}))
})

//Для компиляции ts в js
gulp.task('compiler',()=>{
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest("./app/js"))//Папка в которой сохранится скомпилированный файл
        .pipe(browser.reload({
            stream:true
        }))
})

//Мини сервер, запускает приложение при запуске gulp
gulp.task('browser',()=>{
	browser({
		server:{
			baseDir:'app'
		}
	})
})

//Следит за изменением файлов и при сохраении запускает процессы и перезапускает браузер
gulp.task('watch', ['browser','sass', 'compiler'], ()=>{
    gulp.watch('./src/scss/style.scss',['sass'])
    gulp.watch('./app/index.html', browser.reload)//Для перезагрузки страницы при сохранении index.html
    gulp.watch('./src/ts/main.ts',['compiler'])
})