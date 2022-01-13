//////////
// Photoswipe
//////////
(function ($, APP) {
  APP.Plugins.Photoswipe = {
    data: {
      instance: null,
      pswpItems: [],
      curThumbnail: undefined,
      curSlideIndex: 0,
    },
    init: function (fromPjax) {
      this.eventListeners();
    },
    eventListeners: function () {
      var _this = this;

      _document
        .on('click', '.js-gallery [data-gallery]', function (e) {
          e.preventDefault();

          var $curLink = $(this);

          APP.Plugins.Photoswipe.getThumbData($curLink);
          APP.Plugins.Photoswipe.buildItems($curLink);
          APP.Plugins.Photoswipe.openPSWP($curLink);
        })
        .on('click', '.js-swiper-galleryThumbs .modalGallery__thumb', function () {
          var $thumb = $(this);
          var dataId = $thumb.attr('data-id');

          if (_this.data.instance) {
            _this.data.instance.goTo(Number(dataId));
          }
        });
    },
    getThumbData: function ($originLink) {
      // reset
      this.data.curSlideIndex = 0;
      this.data.curThumbnail = undefined;

      // get swiper slide index
      var $swiper = $originLink.closest('.swiper-container');

      if ($swiper.length > 0) {
        var swiperInst = $swiper[0].swiper;
        if (swiperInst) {
          this.data.curSlideIndex = $swiper[0].swiper.realIndex;
        } else {
          this.data.curSlideIndex = $originLink.closest('.swiper-slide').index();
        }
      }

      // get thumbnail for getThumbBoundsFn func
      this.data.curThumbnail = $originLink.find('img');
    },
    buildItems: function ($originLink) {
      var _this = this;
      var $elements = $originLink.closest('.js-gallery').find('[data-gallery]');
      if ($elements.length === 0) return;

      this.data.pswpItems = [];
      $elements.each(function (i, element) {
        var $element = $(element);
        var isSlideDuplicate = $element.closest('.swiper-slide-duplicate').length > 0;
        var targetImg = $element.find('img');

        // swiper dupplicates filter
        if (isSlideDuplicate) return true;

        // push to data array
        if ($element.data('gallery') !== undefined) {
          // build from attributes if pswp-source type
          var size = $element.data('size').split('x');

          var pswpObj = {
            id: $element.attr('data-id') || i,
            src: $element.attr('data-gallery'),
            msrc: targetImg[0].src, // small image placeholder, main (large) image loads on top of it
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10),
          };

          // optional attributes (caption)
          var $title = $element.data('caption');

          if ($title.length > 0) {
            pswpObj.title = $title;
          }

          _this.data.pswpItems.push(pswpObj);
        } else {
          if (!targetImg) return true;

          _this.data.pswpItems.push({
            src: targetImg[0].src,
            msrc: targetImg[0].src,
            w: targetImg[0].naturalWidth,
            h: targetImg[0].naturalHeight,
          });
        }
      });
    },
    openPSWP: function ($originLink) {
      var $pswpElement = $('.pswp');
      if ($pswpElement.length === 0) return;

      var items = this.data.pswpItems;
      var curThumbnail = this.data.curThumbnail;

      var options = {
        index: this.data.curSlideIndex,
        bgOpacity: 0.5,
        shareEl: false,
        history: true,

        getThumbBoundsFn: function (index) {
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var targetThumbnail = curThumbnail;

          if (curThumbnail.closest('.swiper-container').length > 0) {
            var isPhotoSwiper = curThumbnail.closest('.swiper-container').is('.js-swiper-photos');
            if (!isPhotoSwiper) {
              targetThumbnail = curThumbnail
                .closest('.swiper-container')
                .find('.swiper-slide-active img');
            } else {
              targetThumbnail = curThumbnail
                .closest('.swiper-container')
                .find('.swiper-slide')
                .eq(index)
                .find('img');
            }
          }

          var rect = targetThumbnail[0].getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        addCaptionHTMLFn: function (item, captionEl) {
          var captionHtml = '';
          if (item.title) {
            captionHtml = item.title;
          }

          captionEl.children[0].innerHTML = captionHtml;
          return true;
        },
      };

      // Initializes and opens PhotoSwipe
      var gallery = new PhotoSwipe($pswpElement[0], PhotoSwipeUI_Default, items, options);
      gallery.init();

      this.data.instance = gallery;

      this.buildGalleryThumbs(items);

      // Sync active slide in swiper
      gallery.listen('beforeChange', function () {
        var $swiper = $originLink.closest('.swiper-container');
        if ($swiper.length > 0) {
          var swiper = $swiper[0].swiper;
          if (swiper.params.loop) {
            swiper.slideToLoop(gallery.getCurrentIndex());
          } else {
            swiper.slideTo(gallery.getCurrentIndex());
          }
        }

        $('.modalGallery__thumb').removeClass('is-active');
        $('.modalGallery__thumb[data-id="' + gallery.getCurrentIndex() + '"]').addClass(
          'is-active'
        );

        if ($('.js-swiper-galleryThumbs')[0].swiper) {
          $('.js-swiper-galleryThumbs')[0].swiper.slideTo(Number(gallery.getCurrentIndex()));
        }
      });
    },
    buildGalleryThumbs: function (data) {
      if (data.length === 0) return;
      var $thumbs = $('.js-swiper-galleryThumbs .swiper-wrapper');

      $thumbs.empty();

      $.each(data, function (i, el) {
        var thumbHtml = `<div class="swiper-slide modalGallery__thumb ${
          el.active ? 'is-amctive' : ''
        }" data-id="${el.id}"><img src="${el.msrc}" /></div>`;

        $thumbs.append(thumbHtml);
      });

      APP.Plugins.Sliders.init();

      setTimeout(() => {
        APP.Plugins.Sliders.update();
      }, 300);
      setTimeout(() => {
        APP.Plugins.Sliders.update();
      }, 1000);

      APP.Plugins.LegacySupport.fixImages();
    },
  };
})(jQuery, window.APP);
