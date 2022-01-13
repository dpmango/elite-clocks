// import $ from 'jquery';
import svg4everybody from 'svg4everybody';
import picturefill from 'picturefill';
import viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import objectFitImages from 'object-fit-images/dist/ofi.es-modules.js';
import MicroModal from 'micromodal';
import Swiper, { Navigation, Pagination } from 'swiper';
import AOS from 'aos';
import validate from 'jquery-validation';
import mask from 'jquery-mask-plugin';
import tippy from 'tippy.js';
import Barba from 'barba.js';
import Lazy from 'jquery-lazy';
// import LazyAV from 'jquery-lazy/plugins/jquery.lazy.av.min.js';
// import LazyPicture from 'jquery-lazy/plugins/jquery.lazy.picture.min.js';
import TweenLite from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { disablePageScroll, enablePageScroll, clearQueueScrollLocks } from 'scroll-lock';
import PhotoSwipe from 'photoswipe';
// eslint-disable-next-line camelcase
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

// import scrollMonitor from 'scrollmonitor';

// expose imports to window to use in app.js
// (jquery is exposed in expose-loader)
// window.jQuery = $;
// window.$ = $;
window.svg4everybody = svg4everybody;
window.picturefill = picturefill;
window.objectFitImages = objectFitImages;
window.viewportUnitsBuggyfill = viewportUnitsBuggyfill;
Swiper.use([Navigation, Pagination]);
window.Swiper = Swiper;
window.MicroModal = MicroModal;
window.AOS = AOS;
window.validate = validate;
window.mask = mask;
window.tippy = tippy;
window.Barba = Barba;
window.Lazy = Lazy;
window.ScrollToPlugin = ScrollToPlugin;
// window.TweenMax = TweenMax;
// window.TweenLite = TweenLite;
// window.TimelineMax = TimelineMax;
window.debounce = debounce;
window.throttle = throttle;
window.disablePageScroll = disablePageScroll;
window.enablePageScroll = enablePageScroll;
window.clearQueueScrollLocks = clearQueueScrollLocks;
// window.scrollMonitor = scrollMonitor;
window.PhotoSwipe = PhotoSwipe;
// eslint-disable-next-line camelcase
window.PhotoSwipeUI_Default = PhotoSwipeUI_Default;
