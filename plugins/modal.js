var renderFn      = null;

function Modal( options ) {
   options                  = options || {};
   this.$button             = options.$button;
   this.w                   = options.w || 360;
   this.h                   = options.h || 'auto';
   this.zIndex              = options.zIndex || 999999;
   this.content             = options.content;
   this.template            = options.template;
   this.params              = options.params      || {};
   this.stacked             = options.stacked     || false;
   this.fullHeight          = options.fullHeight  || false;
   this.showCloseBtn        = options.showCloseBtn|| false;
   this.mode                = options.mode        || false;
   this.onOpen              = options.onOpen      || null;
   this.beforeClose         = options.beforeClose || null;
   this.onClose             = options.onClose     || null;
   this.clickOverlayToClose = ( typeof options.clickOverlayToClose === 'undefined' ) ? true : options.clickOverlayToClose;

   showModalPreloader.apply(this);
}

//======================================================================
// Show modal Preloader
//======================================================================

function showModalPreloader() {
   var self = this;
   var $body = $('body');

   if( typeof this.onOpen === 'function' ) this.onOpen();

   var numberCurrentModals = $('.ui-modal').length;

   if( this.stacked ) {
      var html = '<div class="ui-modal" style="z-index:'+ ( self.zIndex + numberCurrentModals ) +'">';
      html += '<div class="ui-modal-overlay"></div></div>';
      $body.append(html)
   } else {
      $('.ui-modal').remove();
      $body.append('<div class="ui-modal" style="z-index:'+ self.zIndex +'"><div class="ui-modal-overlay"></div></div>')
   }

   loadModalContent.apply(this);
   $(window).resize(function() {
      scaleAndPositionModal.apply(self);
   });

   $('.ui-modal').on('touchend click','.action-close-modal', function(e) {
      e.stopPropagation();
      self.close();
   });
}

//======================================================================
// Load Content
//======================================================================

function loadModalContent() {
   var $overlay   = $('.ui-modal').last();
   $overlay.append('<div class="ui-modal-window"></div>');
   var $modal = $overlay.find('.ui-modal-window');

   if( this.showCloseBtn ) {
      $overlay.append('<div class="mui-modal-btn-close ma-close-modal"><i class="icon ion-android-close"></i></div>');
   }

   if( typeof this.content === 'string' ) {
      $modal.html( this.content )
      scaleAndPositionModal.apply(this);
   }

   else if( typeof renderFn === 'function' ) {
      var html = renderFn( this.template, this.params );
      $modal.html( html )
      scaleAndPositionModal.apply(this);
   }

   else {
      $modal.html('Error! No content or template rendering function specified');
      scaleAndPositionModal.apply(this);
      throw new Error('No content or template rendering function specified when setting up modal');
   }
}

//======================================================================
// Scale and Position Modal
//======================================================================

function scaleAndPositionModal() {

   var $modalWindow = $('.ui-modal').last().find('.ui-modal-window');
   $modalWindow.removeClass('-full-height -fill').attr('style','');

   if( $('body').hasClass('xs') || $('body').hasClass('sm') ) {
      $modalWindow.css({
         'width'      : '100%',
         'height'     : '100%',
         'margin-top' : 0,
         'margin-left': 0
      });
      show.apply(this);
   } else {
      var modalWidth  = this.w;
      var modalHeight = this.h;

      if(this.fullHeight) {
         $modalWindow.css({
            'width'       : modalWidth,
            'margin-left' : -1 * modalWidth / 2
         });
         $modalWindow.addClass('-full-height');
         show.apply(this);
      } else if(this.mode === 'fill') {
         $modalWindow.addClass('-fill');
         show.apply(this);
      } else {
         if(modalHeight === 'auto') {
            $modalWindow.css({ 'width' : modalWidth });
            show.apply(this);
            modalHeight = $modalWindow.height();

            $modalWindow.css({
               'margin-top' : -1 * modalHeight / 2,
               'margin-left': -1 * modalWidth / 2
            });
         } else {
            $modalWindow.css({
               'width'      : modalWidth,
               'height'     : modalHeight,
               'margin-top' : -1 * modalHeight / 2,
               'margin-left': -1 * modalWidth / 2
            });
            show.apply(this);
         }

      }
   }
}

//======================================================================
// Show
//======================================================================

function show() {
   var self = this;
   var $modal = $('.ui-modal').last();

   setTimeout(function(){
      $modal.addClass('-visible');
   }, 50);

   if( self.clickOverlayToClose ) {
      $('.ui-modal:last-child .ui-modal-overlay').off('touchend.close-mui-modal click.close-mui-modal');
      $('.ui-modal:last-child .ui-modal-overlay').on('touchend.close-mui-modal click.close-mui-modal', function(e) {

         if( ! $(e.target).closest('.ui-modal-window').length ) {
            self.close.apply(self);
         }
      });
   }
}

//======================================================================
// Close
//======================================================================

Modal.prototype.close = function() {
   if( ! $('.ui-modal').length ) return;

   if( typeof this.beforeClose === 'function' ) {
      this.beforeClose( function() {
         setTimeout(function(){
            $('.ui-modal').last().fadeOut(300, function() {
               $(this).remove();
            });
         }, 400);

      });
   } else {
      $('.ui-modal').last().fadeOut(300, function(){
         $(this).remove();
      });
   }

   if( typeof this.onClose === 'function' ) {
      this.onClose();
   }
}
