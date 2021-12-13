//////////
// GMAPS
//////////
(function ($, APP) {
  APP.Plugins.Gmaps = {
    data: {
      scriptsCreated: false,
      gmapsLoaded: false,
    },
    init: function () {
      if ($('.js-gmap').length > 0) {
        if (this.data.gmapsLoaded) {
          // google.maps.event.addDomListener(window, 'load', this.initMaps.bind(this));
          this.initMaps();
        } else {
          this.tryLoadScripts();
        }
      }
    },
    createScripts: function () {
      var gmapsK = 'AIzaSyA7ixnq-FSDGLYTAWc9zc2ze4UtI2ZuhtA';
      var gmapsScript = document.createElement('script');
      gmapsScript.type = 'text/javascript';
      gmapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${gmapsK}`;
      $('head').append(gmapsScript);
      this.data.scriptsCreated = true;
    },
    tryLoadScripts: function () {
      var _this = this;
      if (!_this.data.scriptsCreated) {
        _this.createScripts();
      }

      var ticker = setInterval(readyChecker, 250);
      function readyChecker() {
        if (!_this.data.gmapsLoaded) {
          try {
            if (google && google.maps && google.maps.event) {
              _this.data.gmapsLoaded = true;
              _this.init(); // reinit
              clearInterval(ticker);
            }
          } catch (e) {
            // console.log('maps not ready yeat, another try');
          }
        }
      }
    },
    initMaps: function () {
      var _this = this;
      $('.js-gmap').each(function (i, domElement) {
        _this.drawMap(domElement);
      });
    },
    drawMap: function (domElement) {
      var _this = this;
      var $domElement = $(domElement);
      if ($domElement.length === 0) return;

      var myMap;
      const center = _this.geoStringToArr($domElement.data('center'));

      var params = {
        center: new google.maps.LatLng(center[0], center[1]),
        zoom: $domElement.data('zoom') || 10,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }, { lightness: 17 }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }, { lightness: 18 }],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }, { lightness: 16 }],
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 21 }],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#dedede' }, { lightness: 21 }],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }],
          },
          { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#f2f2f2' }, { lightness: 19 }],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [{ color: '#fefefe' }, { lightness: 20 }],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }],
          },
        ],
      };

      // placeholder: {
      //   geodata: _this.geoStringToArr($domElement.data('placeholder')),
      //   caption: $domElement.data('placeholder-caption'),
      //   balloon: $domElement.data('placeholder-balloon'),
      // },

      if (!params.center) return;

      // CREATE MAP INSTANCE
      console.log('drawing', params);
      myMap = new google.maps.Map(domElement, params);

      // CONTROLS
      // myMap.controls.remove('trafficControl');
      // myMap.controls.remove('searchControl');
      // myMap.controls.remove('fullscreenControl');
      // myMap.controls.remove('rulerControl');
      // myMap.controls.remove('geolocationControl');
      // myMap.controls.remove('routeEditor');
      // myMap.controls.remove('typeSelector');
      // myMap.controls.remove('zoomControl');

      // PLACEHOLDER
      if (params.placeholder.geodata) {
        var placeholder = new ymaps.Placemark(
          params.placeholder.geodata,
          {
            balloonContent: params.placeholder.balloon,
            iconCaption: params.placeholder.caption,
          },
          {
            preset: 'islands#redIcon',
          }
        );

        // var marker = new google.maps.Marker({
        //   position: new google.maps.LatLng(40.67, -73.94),
        //   map: map,
        //   title: 'Snazzy!',
        // });

        myMap.geoObjects.add(placeholder);
      }
    },
    geoStringToArr: function (str) {
      var split = str.split(',');
      if (split.length === 2) {
        return [parseFloat(split[0]), parseFloat(split[1])];
      }

      return false;
    },
  };
})(jQuery, window.APP);
