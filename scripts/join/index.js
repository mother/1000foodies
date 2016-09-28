function JoinView() {
   this.templates = {
      index :  'join/index.html'
   }
}

//-----------------------------------------------------------------
// Render
//-----------------------------------------------------------------

JoinView.prototype.render = function(options) {
   this.activate();
}

//-----------------------------------------------------------------
// Activate
//-----------------------------------------------------------------

JoinView.prototype.activate = function() {
   var self = this;

   $('.join-subview').hide();
   $('.join-subview:eq(0)').show();

   $('#create-account').on('click', function() {
      $('.tabs .tab').removeClass('active');
      $('.tabs .tab').eq(1).addClass('active');
      $('.join-subview').hide();
      $('.join-subview').eq(1).show();
   })

   $('#create-vendor').on('click', function() {
      $('.tabs .tab').removeClass('active');
      $('.tabs .tab').eq(2).addClass('active');
      $('.join-subview').hide();
      $('.join-subview').eq(2).show();
   })

   $('#join-form').on('submit', this.submitJoinForm.bind(this));
}


//-----------------------------------------------------------------
// Functions
//-----------------------------------------------------------------

JoinView.prototype.submitJoinForm = function(e) {
   var self = this;
   e.preventDefault();

   var $form      = $(e.currentTarget);
   var formData   = $form.serializeJSON();
   var data       = {
      user         : self.pickFormData('user', formData),
      organization : self.pickFormData('organization', formData)
   }

   // mos.users.create(data.user, function(user) {
   //    mos.organizations.create(data.organization, function(organization) {
   //       mos.template('join/finish.html').render({ organization: organization }).into('#mo-join-finish-container');
   //       $('.tabs .tab').removeClass('active');
   //       $('.tabs .tab').eq(2).addClass('active');
   //       self.views.gotoViewIndex(2);
   //    });
   // });
}

JoinView.prototype.pickFormData = function(prefix, data) {
   var result = {};
   for( var key in data ) {
      if( data.hasOwnProperty(key) && key.indexOf(prefix + '.') === 0 ) {
         var newKeyName = key.slice( prefix.length + 1 );
         result[newKeyName] = data[key];
      }
   }

   return result;
}

//-----------------------------------------------------------------
// Exports
//-----------------------------------------------------------------

var instance = new JoinView();
exports.render = instance.render.bind( instance );
