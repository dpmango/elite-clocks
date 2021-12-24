//////////
// SLIDERS
//////////
(function ($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: {
        hero: undefined,
        product: undefined,
        cgallery: undefined,
        articleSidebar: undefined,
        similarProducts: undefined,
        progress: undefined,
      },
      responsiveSwipers: {
        complicationsSwiper: {
          instances: [],
          enableOn: 767,
        },
        videosSwiper: {
          intances: [],
          enableOn: 767,
        },
      },
    },
    init: function (fromPjax) {
      if (!fromPjax) {
        this.initSwipers();
        this.initSwiperDataTree();
        this.initResponsiveSwipers();
      }
      this.listenResize();
    },
    utils: {
      // builder helpers
      buildProps: function (name, options, $dom) {
        const defaultProps = {
          watchOverflow: true,
          setWrapperSize: false,
          slidesPerView: 'auto',
          normalizeSlideIndex: true,
          slideToClickedSlide: true,
          touchEventsTarget: 'wrapper',
          threshold: 10,
        };

        // optional props
        let oProps = {};
        if (options && options.pagination) {
          oProps = {
            pagination: {
              el: `.swiper-${name}-pagination`,
              type: 'bullets',
              clickable: true,
            },
          };
        }

        if (options && options.navigation) {
          oProps = {
            ...oProps,
            navigation: {
              nextEl: `.swiper-${name}-next`,
              prevEl: `.swiper-${name}-prev`,
            },
          };
        }

        // build props from data-
        let domProps = {};
        const dataBefore = $dom.data('offset-before');
        const dataAfter = $dom.data('offset-after');
        const dataSpaceBetween = $dom.data('space-between');

        if (dataBefore) {
          domProps = {
            slidesOffsetBefore: dataBefore,
          };
        }
        if (dataAfter) {
          domProps = {
            ...domProps,
            slidesOffsetAfter: dataAfter,
          };
        }
        if (dataSpaceBetween) {
          domProps = {
            spaceBetween: dataSpaceBetween,
          };
        }

        return {
          ...defaultProps,
          ...oProps,
          ...domProps,
        };
      },
      buildSwiper: function (name, eProps, options) {
        const $page = $('.page').last();
        const $dom = $page.find(`.js-swiper-${name}`);

        if ($dom.length === 0) return;

        let props = APP.Plugins.Sliders.utils.buildProps(name, options, $dom);
        let swiper = new Swiper(`.js-swiper-${name}:not(.swiper-container-initialized)`, {
          ...props,
          ...eProps,
        });
        return swiper;
      },
    },
    update: function (selector) {
      var $swiper;
      // if selector passed - update only with selector
      if (selector) {
        $swiper = $(`${selector}.swiper-container-initialized`);
      } else {
        $swiper = $('.swiper-container-initialized');
      }

      if ($swiper.length > 0) {
        $swiper.each(function (i, swiper) {
          // $(swiper)[0].swiper.updateSize();
          $(swiper)[0].swiper.update();
        });
      }
    },
    listenResize: function () {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function () {
      var _this = this;

      // hero
      this.data.swipers.hero = _this.utils.buildSwiper(
        'hero',
        {
          loop: true,
          spaceBetween: 0,
          slidesPerView: 1,
        },
        { navigation: true, pagination: true }
      );

      // cgallery
      this.data.swipers.cgallery = _this.utils.buildSwiper(
        'cgallery',
        {
          loop: false,
          // spaceBetween: 20,
          slidesPerView: 'auto',
          slidesOffsetAfter: 100,
        },
        { navigation: true, pagination: true }
      );

      // articleSidebar
      this.data.swipers.articleSidebar = _this.utils.buildSwiper(
        'article-sidebar',
        {
          loop: false,
          // spaceBetween: 20,
          slidesPerView: 'auto',
          breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            993: {
              slidesPerView: 4,
            },
          },
        },
        {}
      );

      // similarProducts
      this.data.swipers.similarProducts = _this.utils.buildSwiper(
        'similarProducts',
        {
          loop: false,
          spaceBetween: 30,
          slidesPerView: 4,
          breakpoints: {
            577: {
              slidesPerView: 'auto',
              spaceBetween: 30,
            },
          },
        },
        {}
      );

      // product
      this.data.swipers.product = _this.utils.buildSwiper(
        'product',
        {
          loop: true,
          nested: true,
          spaceBetween: 0,
          slidesPerView: 1,
        },
        { navigation: true }
      );

      // progress
      this.data.swipers.progress = _this.utils.buildSwiper(
        'progress',
        {
          observer: true,
          loop: false,
          spaceBetween: 100,
          slidesPerView: 'auto',
          // centeredSlides: true,
          centerInsufficientSlides: true,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
          freeMode: {
            enabled: true,
            sticky: false,
          },
        },
        {}
      );
    },
    initSwiperDataTree: function () {
      var complicationsSwiper = '.js-swiper-complications';
      if ($(complicationsSwiper).length > 0) {
        this.initSwiperTree(complicationsSwiper, 'complicationsSwiper');
      }

      var videosSwiper = '.js-swiper-videos';
      if ($(videosSwiper).length > 0) {
        this.initSwiperTree(videosSwiper, 'videosSwiper');
      }
    },
    initResponsiveSwipers: function () {
      var complicationsSwiper = '.js-swiper-complications';
      if ($(complicationsSwiper).length > 0) {
        this.responsiveSwiperConstructor(complicationsSwiper, 'complicationsSwiper', {
          watchOverflow: true,
          setWrapperSize: false,
          slidesPerView: 'auto',
          normalizeSlideIndex: true,
          slideToClickedSlide: true,
          touchEventsTarget: 'wrapper',
          threshold: 10,
          pagination: {
            el: '.swiper-complications-pagination',
            type: 'bullets',
            clickable: true,
          },
        });
      }

      var videosSwiper = '.js-swiper-videos';
      if ($(videosSwiper).length > 0) {
        this.responsiveSwiperConstructor(videosSwiper, 'videosSwiper', {
          watchOverflow: true,
          setWrapperSize: false,
          slidesPerView: 'auto',
          normalizeSlideIndex: true,
          slideToClickedSlide: true,
          touchEventsTarget: 'wrapper',
          threshold: 10,
          pagination: {
            el: '.swiper-videos-pagination',
            type: 'bullets',
            clickable: true,
          },
        });
      }
    },
    initSwiperTree: function (selector, name) {
      var _this = this;
      _this.data.responsiveSwipers[name].instances = [];
      $(selector).each(function (i, sw) {
        _this.data.responsiveSwipers[name].instances.push(undefined);
      });
    },
    responsiveSwiperConstructor: function (selector, objName, options) {
      var dataObj = this.data.responsiveSwipers[objName];

      $(selector).each(function (idx, element) {
        if (window.innerWidth <= dataObj.enableOn) {
          if (dataObj.instances[idx] === undefined) {
            dataObj.instances[idx] = new Swiper(element, options);
          }
        } else {
          if (dataObj.instances[idx] !== undefined) {
            dataObj.instances[idx].destroy(true, true);
            dataObj.instances[idx] = undefined;
          }
        }
      });

      this.data.responsiveSwipers[objName] = dataObj;
    },
  };
})(jQuery, window.APP);
