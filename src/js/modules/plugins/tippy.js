//////////
// Tippy
//////////
(function ($, APP) {
  APP.Plugins.Tippy = {
    init: function () {
      const $tippy = $('.page').last().find('.js-tooltip');

      if ($tippy.length === 0) return;

      $tippy.each(function (i, tooltip) {
        const $tooltip = $(tooltip);
        const dataContent = $tooltip.data('content');

        tippy(tooltip, {
          animation: 'scale',
          allowHTML: true,
          content: dataContent,
        });
      });
    },
  };
})(jQuery, window.APP);
