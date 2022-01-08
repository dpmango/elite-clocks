//////////
// Zoom
//////////
(function ($, APP) {
  APP.Plugins.Zoom = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      } else {
        this.createContainers();
      }
    },
    createContainers: function () {
      const $zoom = $('.page').last().find('.js-zoom');

      if ($zoom.length === 0) return;

      // $zoom.each(function (i, zoom) {
      //   const targetImage = $(zoom).find('img').attr('src');

      //   $(zoom).zoom({
      //     url: targetImage,
      //     on: 'mouseover',
      //   });
      // });
    },
    move: function (e) {
      var zoomer = e.currentTarget;
      var offsetX = 0;
      var offsetY = 0;

      e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
      e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
      var x = (offsetX / zoomer.offsetWidth) * 100;
      var y = (offsetY / zoomer.offsetHeight) * 100;
      zoomer.style.backgroundPosition = x + '% ' + y + '%';
    },
    eventListeners: function () {
      var _this = this;

      _document.on('mousemove', '.js-zoom', function (e) {
        _this.move(e);
      });

      _document.on('click', '.js-zoom', function () {
        const $zoom = $(this);
        const $modalContainer = $(this).closest('.modal__container');

        if ($zoom.is('.zoom-initialized')) {
          $zoom.removeClass('zoom-initialized');
          $modalContainer.removeClass('is-zooming');
        } else {
          $zoom.addClass('zoom-initialized');
          $modalContainer.addClass('is-zooming');

          // custom methods not included in origin repo
          $zoom.trigger('zoom.update');
          setTimeout(function () {
            $zoom.trigger('zoom.update');
          }, 1000);

          // $('.modalGallery__slide.is-active .modalGallery__slide-caption').trigger('mouseenter');
        }
      });
    },
  };
})(jQuery, window.APP);
