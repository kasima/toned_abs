(function() {

  var config = {
    default_class:      "vcenter",
    default_template:   "default",
    default_background: "bg_plain.jpg"
  }

  Stacker.init('data.csv', $('.deck-container'), config);
  Stacker.loadSlides();

 $(document).bind('deck.change', function(e, from, to) {
    var current_slide = $.deck("getSlides")[to]

    // optimizely event
    if (to === 5) {
      // parent.optimizely = parent.optimizely || [];
      // parent.optimizely.push(['trackEvent', 'finished']);
      window.optimizely.push(['trackEvent', 'finished']);
    }

    // track slide view
    mixpanel.track('voterid slide viewed', {'number': to, 'id':current_slide.attr("id")})

  });
//  $(document).bind('deck.change', function(e, from, to) {
//    var current_slide = $.deck("getSlides")[to];
//  });

})();