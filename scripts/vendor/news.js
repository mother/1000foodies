const nunjucks = require('nunjucks')
const data = require('../../data/tagliere') // Sample Data

function News() {}

News.prototype.render = function() {
   // API Call can go here to GET actual vendor data from server
   const template = 'views/vendor/news/index.html'
   const html = nunjucks.render(template, { vendor: data })
   const modal = new Modal({
      w: 780,
      fullHeight: true,
      stacked: true,
      content: html
   })
}

//=================================================================
// Exports
//=================================================================

const instance = new News()
exports.render = instance.render.bind(instance)
