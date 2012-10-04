var Stacker = (function(_app){

  _app.templates = {

    setup: function(template_name, el, data){
      if(typeof this[template_name] == "object"){
        this[template_name].setup(el, data);
      }else if (template_name.match(/nb-column/).length > 0) {

        // pull out the grid column values in the format "2-3-5" and pass to setup
        var cols = template_name.substr(10,template_name.length-1).split("-");
        this["nb-column"].setup(el, data, cols);
      }else{
        console.warn("No template defined for: "+template_name + ", defaulting instead");
        this.default.setup(el , data);
      }
    },

    transition: function(template_name, current_slide){
      if(typeof this[template_name] == "object"){
        this[template_name].transition(current_slide);
      }else if(template_name.match(/nb-column/).length > 0) {
        this["nb-column"].transition(current_slide);
      }else{
        console.warn("No template defined for: "+template_name + ", defaulting instead");
        this.default.transition(current_slide);
      }
    },


    // TEMPLATES

    "default": {
      setup: function(el, data){},
      transition: function(){}
    },

    "nb-column": {
      setup: function(el, data, columns) {
        el.addClass('nb-column');
        $(".body", el).first().
          addClass("grid-left-"+columns[0]).
          addClass("grid-top-"+columns[1]).
          addClass("grid-width-"+columns[2]);
      },
      transition: function(){}
    },

    // Template:  Text Continue Inline
    // Displays iniital text with an added ellipsis ("...")
    // and adds additional text (in child slide/s) inline
    // with a fade in transition, removing ellipsis
    "nb-text-continue-inline": {
      setup: function(el, data) {
        el.addClass('nb-text-continue-inline');
        el.addClass('inline');
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('inline-child').addClass('fadein');
        });
      },
      transition: function(current_slide){
        if($(current_slide).hasClass("inline")) {
          var body = $('.body:first', current_slide);

          if($("span.ellipsis", body).length === 0){
            body.html(body.html() + "<span class='ellipsis'>...</span>");
          }
        }else if($(current_slide).hasClass("inline-child")) {
          var inline_parent = current_slide.parents("section.inline");
          $("span.ellipsis", inline_parent).remove();
        }
      }
    },

    // Template:  Text Align Bottom
    // Displays text aligned to the bottom of the screen
    "nb-text-align-bottom": {
      setup: function(el, data) {
        el.addClass("nb-text-align-bottom");
      },
      transition: function(){}
    },

    // Template:  Text Align Top
    // Displays text aligned to the top of the screen
    "nb-text-align-top": {
      setup: function(el, data) {
        el.addClass("nb-text-align-top");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('not-vcenter');// .addClass('fadein');
        });
      },
      transition: function(){}
    },

    // Template: Banner Replace
    // Displays initial text on top
    // And the child slides replace each other
    // By sliding or fading in
    "nb-banner-replace": {
      setup: function(el, data) {
        el.addClass("nb-banner-replace");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('replace');
        });
      },
      transition: function(){}
    },

    "nb-image-children": {
      setup: function(el, data) {
        el.addClass("nb-image-children");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('normal');
          $(slide).removeClass('vcenter');
        });
      },
      transition: function(){}
    },

    "nb-image-children-fade": {
      setup: function(el, data) {
        el.addClass("nb-image-children-fade");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('fadein');
          $(slide).removeClass('vcenter');
        });
      },
      transition: function(){}
    },

    "nb-image-children-replace": {
      setup: function(el, data) {
        el.addClass("nb-image-children-fade");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('replace');
          $(slide).removeClass('vcenter');
        });
      },
      transition: function(){}
    },

    "nb-image-children-fade-replace": {
      setup: function(el, data) {
        el.addClass("nb-image-children-fade");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('fadein');
          $(slide).addClass('fadeout');
          $(slide).removeClass('vcenter');
        });
      },
      transition: function(){}
    },

    "nb-image-fade-text-replace": {
      setup: function(el, data) {
        el.addClass("nb-image-fade-text-replace");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('fadein');
          $(slide).addClass('fadeout');
          $(slide).addClass('body-replace');
          $(slide).removeClass('vcenter');
        });
      },
      transition: function(){}
    },

    "nb-text-samesame-image-different": {
      setup: function(el, data) {
        el.addClass("nb-text-samesame-image-different");
        $('.slide', el).each(function(i, slide){
          $(slide).addClass('fadein');
          $(slide).addClass('fadeout');
          $(slide).removeClass('vcenter');
        });
      },
      transition: function(){}
    }




  };



  return _app;
}(Stacker));


// Template template:
//
//    "nb-xxxx": {
//      setup: function(el, data) {
//        el.addClass("nb-xxxx");
//        $('.slide', el).each(function(i, slide){
//          $(slide).addClass('xxxx');// .addClass('xxxx');
//        })
//      },
//      transition: function(){}
//    }