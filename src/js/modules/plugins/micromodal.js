//////////
// Micromodal
//////////
(function ($, APP) {
  APP.Plugins.MicroModal = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
      // https://micromodal.now.sh
      MicroModal.init({
        onShow: (modal) => {
          APP.Plugins.ScrollBlock.disableScroll();
        },
        onClose: (modal) => {
          APP.Plugins.ScrollBlock.enableScroll();
        },
        openClass: 'is-open',
        disableScroll: false,
        disableFocus: false,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,
        debugMode: false,
      });
    },
    eventListeners: function () {
      var _this = this;
      // _document.on('click', '[data-custom-open]', function () {
      //   let modalName = $(this).data('custom-open');
      //   MicroModal.show(modalName);
      // });
      _document.on('click', '[data-micromodal-close]', function () {
        let modalName = $(this).closest('.modal').attr('id');
        MicroModal.close(modalName);
      });
      _document.on('click', '.modal__container', function (e) {
        e.stopPropagation();
      });

      // gallery
      _document
        .on('click', '.js-trigger-gallery', function () {
          var $trigger = $(this);
          var dataGalleryId = $trigger.data('gallery-id');

          var $gallery = $('.js-gallery[data-gallery-id="' + dataGalleryId + '"]');

          $gallery.find('[data-gallery]').first().click();
        })
        .on('click', '.js-gallery [data-gallery]', function () {
          var $trigger = $(this);
          var $container = $trigger.closest('.js-gallery');
          var index =
            $trigger.closest('.swiper-slide').length > 0
              ? $trigger.parent().index()
              : $trigger.index();

          var galleryData = [];

          $container.find('[data-gallery]').each((idx, element) => {
            var $el = $(element);

            galleryData.push({
              id: $el.data('id') || idx,
              active: index === idx,
              mainSrc: $el.data('gallery'),
              caption: $el.data('caption'),
              thumb: $el.data('thumb') || $el.find('img').attr('src'),
            });
          });

          _this.buildGalleryModal(galleryData);
        })
        .on('click', '.js-modal-gallery .modalGallery__thumb', function () {
          var $thumb = $(this);
          var dataId = $thumb.attr('data-id');

          _this.changeGalleryModalSlide(dataId);
        });
    },
    buildGalleryModal: function (data) {
      if (data.length === 0) return;
      var $modal = $('.js-modal-gallery');

      $modal.empty();

      var modalName = $modal.closest('.modal').attr('id');
      var $thumbsHtml = $(
        '<div class="modalGallery__thumbs swiper-container js-swiper-galleryThumbs">' +
          '<div class="swiper-wrapper"></div>' +
          '<div class="gallery__prev swiper-galleryThumbs-prev"><svg class="ico ico-mono-arrow-left"><use xlink:href="#ico-mono-arrow-left"></use></svg></div>' +
          '<div class="gallery__next swiper-galleryThumbs-next"><svg class="ico ico-mono-arrow-right"><use xlink:href="#ico-mono-arrow-right"></use></svg></div>' +
          '</div>'
      );

      $.each(data, function (i, el) {
        var html = `<div class="modalGallery__slide ${el.active ? 'is-active' : ''}" data-id="${
          el.id
        }"><div class="js-zoom" style="background-image: url(${el.mainSrc})"><img src="${
          el.mainSrc
        }" /></div><div class="modalGallery__slide-caption">${el.caption}</div></div>`;

        var thumbHtml = `<div class="swiper-slide modalGallery__thumb ${
          el.active ? 'is-active' : ''
        }" data-id="${el.id}"><img src="${el.thumb}" /></div>`;

        $modal.append(html);
        $thumbsHtml.find('.swiper-wrapper').append(thumbHtml);
      });

      $modal.append($thumbsHtml);
      MicroModal.show(modalName);
      APP.Plugins.Sliders.init();
      APP.Plugins.Zoom.init(true);
      APP.Plugins.LegacySupport.fixImages();
    },
    changeGalleryModalSlide: function (dataId) {
      var $thumb = $('.js-modal-gallery .modalGallery__thumb[data-id="' + dataId + '"]');
      var $slide = $('.js-modal-gallery .modalGallery__slide[data-id="' + dataId + '"]');

      $slide.siblings().removeClass('is-active');
      $slide.addClass('is-active');

      $thumb.siblings().removeClass('is-active');
      $thumb.addClass('is-active');
    },
  };
})(jQuery, window.APP);
