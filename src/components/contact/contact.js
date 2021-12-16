//////////
// Contact
//////////
(function ($, APP) {
  APP.Components.Contact = {
    data: {},
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
    },

    eventListeners: function () {
      _document.on('click', '.js-contact-tabs-nav li', function () {
        var $link = $(this);
        var $container = $link.closest('.js-contact-tabs');
        var dataId = $link.data('id');
        var dataMap = $link.data('map');
        var $targetTab = $container.find('.js-contact-tab[data-id=' + dataId + ']');

        $link.siblings().removeClass('is-active');
        $link.addClass('is-active');
        $('.js-contact-tab').hide();
        $targetTab.fadeIn();

        if (APP.Plugins.Gmaps.data.instance) {
          const marker = APP.Plugins.Gmaps.geoStringToArr(dataMap);
          APP.Plugins.Gmaps.data.instance.panTo(new google.maps.LatLng(marker[0], marker[1]));
        }
      });
    },
  };
})(jQuery, window.APP);
