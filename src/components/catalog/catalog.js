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
      _document
        .on('click', '.js-catalog-sidebar-section', function () {
          let $section = $(this).parent();
          let $content = $section.find('.catSidebar__content');

          if ($section.is('.is-open')) {
            $content.slideUp();
          } else {
            $content.slideDown();
          }
          $section.toggleClass('is-open');
        })
        .on('click', '.js-catalog-filter-toggle', function () {
          var $toggle = $(this);
          var $sidebar = $('.js-catalog-filter');
          var $background = $('.js-catalog-filter-background');

          $sidebar.addClass('is-active');
          $background.addClass('is-active');
          APP.Plugins.ScrollBlock.disableScroll();
        })
        .on('click', '.js-catalog-filter-close, .js-catalog-filter-background', function () {
          var $sidebar = $('.js-catalog-filter');
          var $background = $('.js-catalog-filter-background');

          $sidebar.removeClass('is-active');
          $background.removeClass('is-active');
          APP.Plugins.ScrollBlock.enableScroll();
        });
    },
  };
})(jQuery, window.APP);
