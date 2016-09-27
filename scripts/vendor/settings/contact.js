const nunjucks = require('nunjucks')
const data = require('../../../data/tagliere') // Sample Data

function ContactSettings() {}

ContactSettings.prototype.render = function() {
   // API Call can go here to GET actual vendor data from server
   const template = 'views/vendor/settings/contact.html'
   const html = nunjucks.render(template, { vendor: data })
   const modal = new Modal({
      w: 720,
      fullHeight: true,
      stacked: true,
      content: html
   })

   this.setupDelegates()
}

ContactSettings.prototype.setupDelegates = function() {

}

ContactSettings.prototype.save = function() {
   // API Call / PUT to save vendor settings
}

//=================================================================
// Exports
//=================================================================

const instance = new ContactSettings()
exports.render = instance.render.bind(instance)
