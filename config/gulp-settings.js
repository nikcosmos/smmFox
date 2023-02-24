// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// Пути источника и бандла
const buildFolder = `./dist`;
const srcFolder = `./src`;

// Пути до папок проекта
export const path = {
   build: {
      html: `${buildFolder}/`,
      js: `${buildFolder}/js/`,
      css: `${buildFolder}/css/`,
      images: `${buildFolder}/img/`,
      fonts: `${buildFolder}/fonts/`,
      files: `${buildFolder}/files/`,
   },
   src: {
      html: `${srcFolder}/*.html`,
      pug: `${srcFolder}/pug/*.pug`,
      js: `${srcFolder}/js/app.js`,
      scss: `${srcFolder}/scss/style.scss`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
      svg: `${srcFolder}/img/**/*.svg`,
      fonts: `${srcFolder}/fonts/*.*`,
      files: `${srcFolder}/files/**/*.*`,
      svgicons: `${srcFolder}/svgicons/*.svg`,
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   rootFolder: rootFolder,
   srcFolder: srcFolder,
   ftp: ``, // Путь до нужной папки на сервере(gulp добавить автоматически)
};

// Настройка FTP
export const configFTP = {
   host: '',
   user: '',
   password: '',
   parallel: 5,
};
