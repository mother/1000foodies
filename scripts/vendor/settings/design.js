const nunjucks = require('nunjucks')
const data = require('../../../data/tagliere') // Sample Data

function DesignSettings() {}

DesignSettings.prototype.render = function() {
   // API Call can go here to GET actual vendor data from server
   const template = 'views/vendor/settings/design.html'
   const html = nunjucks.render(template, { vendor: data })
   const modal = new Modal({
      w: 720,
      fullHeight: true,
      stacked: true,
      content: html
   })

   this.setupDelegates()
}

DesignSettings.prototype.setupDelegates = function() {
   $('.primary-color').colorPicker()
}

DesignSettings.prototype.save = function() {
   // API Call / PUT to save vendor settings
}

//=================================================================
// Exports
//=================================================================

const instance = new DesignSettings()
exports.render = instance.render.bind(instance)
