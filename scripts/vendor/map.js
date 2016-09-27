var geocode = new google.maps.Geocoder();

function GoogleMaps() {}

//=================================================================
// Render
//=================================================================

GoogleMaps.prototype.render = function(options) {
   var self = this
   var type = options.type || 'roadmap'

   self.mapType = mapTypeId(type)
   self.title = options.title || ''
   self.address = options.address || ''
   self.lat = 0
   self.lng = 0
   self.zoom = options.zoom || 15
   self.container = options.container

   self.activate(options)
}

//=================================================================
// Activate
//=================================================================

GoogleMaps.prototype.activate = function(options) {
   var self = this;

   geocode.geocode({ address : self.address }, function(location) {
      if (location !== null) {
         self.lat = location[0].geometry.location.lat()
         self.lng = location[0].geometry.location.lng()

         self.location     = new google.maps.LatLng(self.lat,self.lng)
         self.map          = new google.maps.Map( $(self.container).get(0), {
            zoom        : self.zoom,
            center      : self.location,
            mapTypeId   : self.mapType,
            scrollwheel : false
         });

         self.marker = new google.maps.Marker({
            position : self.location,
            map      : self.map,
            title    : self.title
         });
      }
   });
}

//=================================================================
// Set Map Type
//=================================================================

function mapTypeId(mapLayout) {
   if( typeof mapLayout === 'string') {
      var mapType = mapLayout.toUpperCase();
      if( ['HYBRID', 'ROADMAP', 'SATELLITE', 'TERRAIN'].indexOf(mapType) !== -1 ) {
         return google.maps.MapTypeId[mapType];
      }
   }
   return google.maps.MapTypeId.ROADMAP;
}

//=================================================================
// Exports
//=================================================================

var instance = new GoogleMaps()
exports.render = instance.render.bind(instance)
