const conf = require('./gulp.conf');
const proxy = require('http-proxy-middleware');

const midiSyncProxy = proxy('/api/midi', {
  target: 'http://localhost:3010',
  changeOrigin: true,
  ws: true,
  logLevel: 'debug'
});

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [midiSyncProxy]
    },
    open: false
  };
};
