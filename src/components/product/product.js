//////////
// PRODUCT
//////////
(function ($, APP) {
  APP.Components.Product = {
    data: {},
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
    },

    eventListeners: function () {
      _document
        .on('click', '.js-productMedia-thumb', function () {
          let $thumb = $(this);
          let $thumbs = $thumb.siblings();

          $thumbs.removeClass('is-active');
          $thumb.addClass('is-active');
        })
        .on('click', '.js-productProgressToggle', function () {
          $(this).toggleClass('is-toggled');
        });
    },
  };
})(jQuery, window.APP);
