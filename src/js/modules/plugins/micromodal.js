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
      _document.on('click', '.js-trigger-gallery', function () {
        var $trigger = $(this);
        var dataGalleryId = $trigger.data('gallery-id');

        var $gallery = $('.js-gallery[data-gallery-id="' + dataGalleryId + '"]');

        $gallery.find('[data-gallery]').first().click();
      });
      // .on('click', '.js-gallery [data-gallery]', function () {
      //   var $trigger = $(this);
      //   var $container = $trigger.closest('.js-gallery');
      //   var index =
      //     $trigger.closest('.swiper-slide').length > 0
      //       ? $trigger.parent().index()
      //       : $trigger.index();

      //   var galleryData = [];

      //   $container.find('[data-gallery]').each((idx, element) => {
      //     var $el = $(element);

      //     galleryData.push({
      //       id: $el.data('id') || idx,
      //       active: index === idx,
      //       mainSrc: $el.data('gallery'),
      //       caption: $el.data('caption'),
      //       thumb: $el.data('thumb') || $el.find('img').attr('src'),
      //     });
      //   });

      //   _this.buildGalleryModal(galleryData);
      // })
      // .on('click', '.js-modal-gallery .modalGallery__thumb', function () {
      //   var $thumb = $(this);
      //   var dataId = $thumb.attr('data-id');

      //   _this.changeGalleryModalSlide(dataId);
      // });
    },
  };
})(jQuery, window.APP);
