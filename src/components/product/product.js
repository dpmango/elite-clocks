//////////
// PRODUCT
//////////
(function ($, APP) {
  APP.Components.Product = {
    data: {
      players: [],
      scriptsCreated: false,
      ytLoaded: false,
    },
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
      this.tryLoadScripts();

      $('.productCard, .productFull').on('click', function (e) {
        var $target = $(e.target);
        var isGalleryPrev = $target.closest('.productCard__gallery-prev').length;
        var isGalleryNext = $target.closest('.productCard__gallery-next').length;
        var isGalleryFullPrev = $target.closest('.productFull__gallery-prev').length;
        var isGalleryFullNext = $target.closest('.productFull__gallery-next').length;

        var isLink = $target.closest('.js-link').length;

        if (isLink) {
          var dataHref = $target.closest('.js-link').data('href');
          if (dataHref && dataHref !== '#') {
            e.preventDefault();
            e.stopPropagation();
            Barba.Pjax.goTo(dataHref);
          }
        }

        if (isGalleryPrev || isGalleryNext || isGalleryFullPrev || isGalleryFullNext) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
    },
    createScripts: function () {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.data.scriptsCreated = true;
    },
    tryLoadScripts: function () {
      var _this = this;
      if (!_this.data.scriptsCreated) {
        _this.createScripts();
      }

      var ticker = setInterval(readyChecker, 250);
      function readyChecker() {
        if (!_this.data.ytLoaded) {
          try {
            if (YT && YT.Player) {
              _this.data.ytLoaded = true;
              clearInterval(ticker);
            }
          } catch (e) {
            // console.log('err loading youtube api')
          }
        }
      }
    },
    eventListeners: function () {
      var _this = this;

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

          $.each(_this.data.players, function (i, player) {
            player.stopVideo();
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
          var $player = $container.find('div[data-youtube-video]');
          // var $placeholder = $container.find('.video__placeholder');
          // var $details = $container.find('.video__details');

          $container.addClass('is-playing');
          if (video) {
            video.play();
          } else if ($player && $player.length) {
            var player = new YT.Player($player[0], {
              height: '100%',
              width: '100%',
              videoId: $player.data('youtube-video'),
              events: {
                onReady: function (event) {
                  event.target.playVideo();
                },
              },
            });

            _this.data.players.push(player);
          }
        })
        .on('click', '.js-video video', function () {
          var video = $(this)[0];

          if (video && video.paused) {
            video.pause();
          } else {
            video.play();
          }
        });
    },
  };
})(jQuery, window.APP);
