
const { static: serveStatic } = require('express')
const appPaths = require('../../app-paths')

/**
 * It is applied for dev only!
 */
module.exports = quasarConf => {
  return {
    name: 'quasar:cordova-platform-inject',
    enforce: 'pre',

    configureServer (server) {
      const folder = appPaths.resolve.cordova(`platforms/${ quasarConf.ctx.targetName }/platform_www`)
      server.middlewares.use('/', serveStatic(folder, { maxAge: 0 }))
    },

    transformIndexHtml: {
      enforce: 'pre',
      transform: html => html.replace(
        '<!-- quasar:entry-point -->',
        '<script src="cordova.js"></script><!-- quasar:entry-point -->'
      )
    }
  }
}