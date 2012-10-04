var Stacker = (function(_app){
  _app.content_loader = {
    
    // Parse a row of CSV into an object
    parseSlideData: function(row, row_num){
      var img = row[_app.config.IMAGES_COL];

      if(row[_app.config.CLASSES_COL] === "" && row[_app.config.TEMPLATE_COL] !== ""){
        var classes = "";
      }
      
      return {
        text : this.parseText(row[_app.config.TEXT_COL]),
        
        template          : row[_app.config.TEMPLATE_COL] || _app.config.default_template,
        id                : row[_app.config.ID_COL]       || "s_"+row_num,
        grid              : row[_app.config.GRID_COL]     || _app.config.default_grid,
        background_image  : row[_app.config.BG_COL]       || "",
        supporting_images : (img === "" || img === undefined) ? [] : img.split(","),

        classes           : function(){
          var col = row[_app.config.CLASSES_COL];
          // if no class is specified, but we have a template, don't add the default class
          if(col === "" && row[_app.config.TEMPLATE_COL] !== ""){
            return "";
          }else if(col !== ""){
            return col;
          }else{
            return _app.config.default_class;
          }
        }(),



        sources : function(){
          var src_array = [];
          var names = row[_app.config.SOURCE_NAME_COL].split(',');
          var descs = row[_app.config.SOURCE_DESCRIPTION_COL].split(',');
          var links = row[_app.config.SOURCE_LINK_COL].split(',');

          for(var i=0; i<names.length; i++){
            var source = {
              name: names[i],
              description: descs[i],
              link: links[i]
            };

            if(source.name){
              src_array.push(source);
            }
          }
          return src_array;
        }(),

        // child slides
        slides : []
      };
    },
    
    insertImages: function(html_element, data){
      // Insert primary background image.
      var image_file = data.background_image || _app.config.default_background;
      html_element.find(".bg").css("background-image", "url('images/"+image_file+"')");
      html_element.data("bg", image_file);

      if(image_file === _app.config.default_background){
        html_element.find(".bg").hide();
      }

      // Insert supporting images into .image div.
      $.each(data.supporting_images, function(i, img){
        var img_element = $("<img>").attr("src", "images/"+img);
        html_element.find('.images:first').append(img_element);
      });

      // Insert supporting images for child slides.
      if(data.slides.length > 0){
        var child_slides = html_element.find(".slide");
        $.each(data.slides, function(i, row) {
          $.each(row.supporting_images, function(j, img) {
            if(img){
              var img_element = $("<img>").attr("src", "images/"+img);
              $(child_slides[i]).find('.images:first').append(img_element);
            }
          });
        });
      }
      return html_element;
    },
    
    convertCSVStringToArray: function(string) {
      return $.csv()(string).slice(1);
    },
    
    loadSlides: function(handleLoad){
      var _this = this;

      $.get(_app.config.PATH_TO_CSV, function(data) {
        var array = _this.convertCSVStringToArray(data);
        array = _this.fixNewlineBreaks(array);

        // Generate the HTML and append to the DOM
        var slide_elements = _this.generateHTMLFromSlides(array);
        _app.config.container.append(slide_elements);
        
        handleLoad.call();
      });
    },
    
    generateHTMLFromSlides: function(array){
      var slide_elements = [];
      var slide_count = 2; // we ignore header row and 0 index
      _this = this;
      $.each(array, function(i, row) {
        if(!row) return false;

        // get the data object from the CSV
        var slide_data = _this.parseSlideData(row, slide_count++);
        
        var sources = slide_data.sources;

        // add the child slides
        var num_children = row[_app.config.CHILD_ROWS_COL] || 0;
        for(var j=1;j<=num_children;j++){
          var child = _this.parseSlideData(array.splice(i+1, 1).shift(), slide_count++);
          slide_data.slides.push(child);
          
          // push sources from children into main source array
          sources = sources.concat(child.sources);
        }



        // render the ICanHaz template
        var slide_element = ich["default"](slide_data);
        slide_element = _this.insertImages(slide_element, slide_data);
        _app.templates.setup(slide_data.template, slide_element, slide_data);

        slide_element.data('sources', sources);
        slide_element.data('template', slide_data.template);

        // add it to the array of slides to be appended to the DOM
        slide_elements.push(slide_element[0]);
      });

      return slide_elements;
    },


    // Fix for: jquery csv plugin doesn't handle newlines in cells
    fixNewlineBreaks: function(array){
      $.each(array, function(i, row) {
        // .each will keep iterating even if array shrinks in size
        if(!row) return false;

        // Concat arrays if they were mistakenly split on newlines within cells.
        if(row.length != array[0].length){
          var next_row = array.splice(i+1, 1).shift();
          array[i] = row.concat(next_row);
        }

      });

      return array;
    },

    // Hide any text contained in square brackets (replace with images, etc.)
    parseText: function(text_data){
      var parsed_text = text_data.replace("[[", "<span class='text-replace'>");
      return parsed_text.replace("]]", "</span>");
    }
  };

  return _app;
}(Stacker));