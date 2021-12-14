//////////
// Complications
//////////
(function ($, APP) {
  APP.Components.Complications = {
    data: {},
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
    },

    eventListeners: function () {
      _document.on('click', '.js-complications-more', function () {
        // TODO - do some API things
        $(this).addClass('is-loading');

        setTimeout(() => {
          $(this).removeClass('is-loading');
        }, 1000);
      });
    },
  };
})(jQuery, window.APP);
