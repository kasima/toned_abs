var Stacker = (function ($) {
  var _app = {};

  _app.init = function(PATH_TO_CSV, container, config){
    if (this.hasValidBrowser()) {
      this.setConfig(config, PATH_TO_CSV, container);
      this.setupEvents();
      this.setupResizeHandler();
      this.handleResizeEvent();

      // add the default background to the deck-container
      $(".deck-container").css("background-image", "url('images/"+this.config.default_background+"')");
     } else {
      $('.rejected-browser').show();
      $('#stacker-nav').hide();
      $('.deck-progress').hide();
    }
  };

  _app.loadSlides = function(){
    this.content_loader.loadSlides(function(){
     $.deck('.slide', {countNested: false});
    });
  };


  _app.hasValidBrowser = function() {
    return !($.browser.msie || ($.browser.mozilla && parseInt($.browser.version, 10) < 4));
  };

  _app.setConfig = function(config, PATH_TO_CSV, container){
    this.config = {
      PATH_TO_CSV:            PATH_TO_CSV,
      container:              container,
      default_class:          config.default_class      || "vcenter",
      default_template:       config.default_template   || "default",
      default_background:     config.default_background || "",
      default_grid:           config.default_grid       || "fourteen columns offset-by-one v50",

      TEXT_COL:               0,
      CHILD_ROWS_COL:         1,
      TEMPLATE_COL:           2,
      GRID_COL:               3,
      CLASSES_COL:            4,
      ID_COL:                 5,
      BG_COL:                 6,
      IMAGES_COL:             7,
      SOURCE_NAME_COL:        9,
      SOURCE_DESCRIPTION_COL: 10,
      SOURCE_LINK_COL:        11
    };
  };
  
  _app.handleSources = function(current_slide){
    // RESET SOURCE PANEL BETWEEN SLIDES
    $("#source-panel").hide();
    $("#toc-panel").hide();
    $("#source-panel .links").html("");
    $("#source-button").removeClass("active");

    // grab parent slide - all sources stored there
    if($(current_slide).tagName != "section"){
      current_slide = $(current_slide).closest("section.slide");
    }
    var sources = current_slide.data("sources");
    if(sources.length > 0){
      $("#source-button").addClass("active");
      $.each(sources, function(i, source){
        $("<a>", {
          href: source.link,
          target: "_blank",
          html: source.name + ": " +source.description
        }).appendTo("#source-panel .links");
      });
    }
  };

  _app.setupResizeHandler = function() {
    //console.log("resize event (width=" + $(window).width() + " height="
    $(window).resize(this.handleResizeEvent);
  }

  _app.handleResizeEvent = function() {
    var deckWidth = parseInt($('.deck-container').css('width'), 10);
    var width = $(window).width();
    if (width < deckWidth) {
      var scale = width / deckWidth;
      var translate = 'translate(-50%, -50%) scale(' + scale + ', ' + scale + ') translate(50%, 50%)';
      $('.stack').css('-webkit-transform', translate);
      $('.stack').css('-moz-transform', translate);
      $('.stack').css('-o-transform', translate);
    }
  }

  _app.setupEvents = function(){

    // Enable the source button when sources are available
    $("#source-button").click(function(){
      if($("#source-button").hasClass("active")) {
        $("#source-panel").slideToggle(200);
      }
    });

    $("#toc-button").click(function(){
      $("#toc-panel").slideToggle(200);
    });


    // Attach extra functionality based on slide class names
    $(document).bind('deck.updated', function(event, dir) {
      var current_slide = $.deck('getSlide');
      if(current_slide.hasClass('skip')){

        if(dir > 0)
          $.deck('next');

        // TODO: fix going backward
        /*
        else
          $.deck('previous');
        */
      }
    });

    $(document).bind('deck.change', function(event, from, to){
      var current_slide = $.deck("getSlide", to);
      var root_slide = current_slide.closest("section");
      var prev_slide = $.deck("getSlide", from);
      var prev_root = prev_slide.closest("section");

      // Display progress with horizontal bar
      var total = parseInt($('.deck-status-total').html(), 10);
      var current = parseInt($('.deck-status-current').html(), 10);
      $('.progress-current').width($('.deck-progress').width() * (current/total));

      // Display the appropriate sources for the current slide
      _app.handleSources(current_slide);

      // Handle transitions for specific templates
      Stacker.templates.transition(root_slide.data('template'), current_slide);

      // if the next slide is a root slide
      // (Note: when going backwards, need to look for n-1)
      if(current_slide[0].nodeName.toLowerCase() == "section") {
        if(current_slide.data('bg') != prev_root.data('bg')){
          prev_root.find('.bg').show();
          current_slide.find('.bg').show();
        }else{
          if(prev_root.data('bg') == _app.config.default_background){
            prev_root.find('.bg').hide();
          }
        }
      }



    });

    // Make the Stacker advance on general click
    $('.deck-container').click(function(){
      $.deck("next");
    });
  };




	return _app;
}(jQuery));
