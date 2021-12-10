//////////
// CATALOG
//////////
(function ($, APP) {
  APP.Components.Catalog = {
    data: {},
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
    },

    eventListeners: function () {
      _document.on('click', '.js-catalog-sidebar', function () {
        let $section = $(this).parent();
        let $content = $section.find('.catSidebar__content');

        if ($section.is('.is-open')) {
          $content.slideUp();
        } else {
          $content.slideDown();
        }
        $section.toggleClass('is-open');
      });
    },
  };
})(jQuery, window.APP);
