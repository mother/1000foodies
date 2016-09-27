const nunjucks = require('nunjucks')
const data = require('../../../data/tagliere') // Sample Data

function AboutSettings() {}

AboutSettings.prototype.render = function() {
   // API Call can go here to GET actual vendor data from server
   const template = 'views/vendor/settings/about.html'
   const html = nunjucks.render(template, { vendor: data })
   const modal = new Modal({
      w: 720,
      fullHeight: true,
      stacked: true,
      content: html
   })

   this.setupDelegates()
}

AboutSettings.prototype.setupDelegates = function() {

}

AboutSettings.prototype.save = function() {

}

//=================================================================
// Exports
//=================================================================

const instance = new AboutSettings()
exports.render = instance.render.bind(instance)
