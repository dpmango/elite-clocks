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
          let $container = $thumb.closest('.productMedia');
          let dataId = $thumb.data('id');

          var $tagetVideo = $container.find('.productMedia__video[data-id="' + dataId + '"]');

          $thumb.siblings().removeClass('is-active');
          $thumb.addClass('is-active');

          $tagetVideo.siblings().each(function (i, v) {
            $(v).find('.js-video').removeClass('is-playing');
            var $video = $(v).find('video');
            if ($video && $video.length) {
              $video[0].pause();
            }
          });

          $tagetVideo.siblings().removeClass('is-active');
          $tagetVideo.addClass('is-active');
        })
        .on('click', '.js-productProgressToggle', function () {
          $(this).toggleClass('is-toggled');
          var $first = $('.productProgress__grid[data-id="' + 1 + '"]');
          var $second = $('.productProgress__grid[data-id="' + 2 + '"]');

          if ($(this).is('.is-toggled')) {
            $first.hide();
            $second.fadeIn();
          } else {
            $second.hide();
            $first.fadeIn();
          }

          // APP.Plugins.Sliders.update();
        })
        .on('click', '.js-video .video__play', function () {
          // play video function
          var $toggle = $(this);
          var $container = $toggle.closest('.js-video');
          var $content = $container.find('.video__content');
          var video = $content.find('video')[0];
          // var $placeholder = $container.find('.video__placeholder');
          // var $details = $container.find('.video__details');

          $container.addClass('is-playing');
          video.play();
        })
        .on('click', '.js-video video', function () {
          var video = $(this)[0];

          if (video.paused) {
            video.pause();
          } else {
            video.play();
          }
        });
    },
  };
})(jQuery, window.APP);
