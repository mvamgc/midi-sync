const gulp = require('gulp');
const browserSync = require('browser-sync');
const spa = require('browser-sync-spa');
const nodemon = require('gulp-nodemon');

const browserSyncConf = require('../conf/browsersync.conf');
const browserSyncDistConf = require('../conf/browsersync-dist.conf');

browserSync.use(spa());

gulp.task('browsersync', browserSyncServe);
gulp.task('browsersync:dist', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init(browserSyncConf());
  expressServe();
  done();
}

function browserSyncDist(done) {
  browserSync.init(browserSyncDistConf());
  expressServe();
  done();
}

function expressServe() {
  nodemon({
    script: 'server/index.js',
    verbose: true,
    delayTime: 1,
    env: {
      PORT: 3010
    },
    watch: ['server']
  }).on('restart', () => {
    console.log('restarted!');
    setTimeout(() => {
      browserSync.notify('reloading now ...');
      browserSync.reload({stream: false});
    }, 1);
  }).on('start', () => {
  }).on('crash', () => {
    console.error('Application has crashed!');
  }).on('exit', () => {
    console.log('exited');
  });
}
