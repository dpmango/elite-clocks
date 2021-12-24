//////////
// CICKS
//////////
(function ($, APP) {
  APP.Plugins.Clicks = {
    init: function () {
      $(document)
        .on('click', '[href="#"]', function (e) {
          e.preventDefault();
        })
        .on('click', '.js-link', function (e) {
          var dataHref = $(this).data('href');
          if (dataHref && dataHref !== '#') {
            e.preventDefault();
            e.stopPropagation();
            Barba.Pjax.goTo(dataHref);
          }
        })
        // prevent going the same link (if barba is connected)
        .on('click', 'a, .js-link', function (e) {
          var href = $(this).data('href') || $(this).attr('href');
          var path = window.location.pathname;

          if (href === path.slice(1, path.length)) {
            e.preventDefault();
            e.stopPropagation();
          }
        })
        // grid toggler
        .on('click', '.js-show-grid', function () {
          $(this).toggleClass('is-active');
          $('.demo-grid').fadeToggle();
        });
    },
    destroy: function () {
      // ... code ...
    },
  };
})(jQuery, window.APP);
