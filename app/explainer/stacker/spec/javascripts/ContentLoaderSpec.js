/*
  expect(a).toBe(b);
  expect(a).not.toBe(null);
  expect(a).toEqual(12);
  expect(message).toMatch(/bar/);   /   expect(message).toMatch('bar');
  expect(a.foo).toBeDefined();
  expect(null).toBeNull();
  expect(foo).toBeTruthy();         /   expect(a).toBeFalsy();
  expect(a).toContain('bar'); // array
  expect(e).toBeLessThan(pi);       / expect(pi).toBeGreaterThan(e);
  expect(pi).not.toBeCloseTo(e, 0.1);
  expect(bar).toThrow();
  
  xdescribe / xit - (disable)
  
  spies:
  http://pivotal.github.com/jasmine/#section-Spies

*/

describe("ContentLoader", function() {
  var stacker;
  var content_loader;
  var data_csv;

  beforeEach(function() {
    stacker = Stacker;
    content_loader = stacker.content_loader;
    
    data_csv = "text,child rows,template,classes,id,background image,supporting images,BLOCKING,Source,Description,Link,blank\n";
    data_csv += '[Drone warfare],3,nb-default,,"smaller_text fadein",dr_test,plain.jpg,dr_titleslide.jpg,blocking,Time,"An Article",http://foo.com,\n'
    data_csv += 'drone [[content]],,,,,,,,,,,'
  });
  
  describe("parses CSV", function() {
    var data_array;
    
    beforeEach(function(){
      stacker.setConfig({});
      data_array = $.csv()(data_csv).slice(1);
    })
    
    it("should parse main attributes", function() {

       var row = stacker.content_loader.parseSlideData(data_array[0]);

       expect(row).toEqual(jasmine.any(Object));
       expect(row.text).toEqual('[Drone warfare]');
       expect(row.classes).toEqual('smaller_text fadein');
       expect(row.template).toEqual('nb-default');
       expect(row.id).toEqual('dr_test');
       expect(row.background_image).toEqual('plain.jpg');

    });
    
    it("should parse supporting images into an array", function(){
      var row = stacker.content_loader.parseSlideData(data_array[0]);
      expect(row.supporting_images[0]).toEqual('dr_titleslide.jpg');
    });
    
    it("should add <span>s to text meant to be hidden", function(){
      var row = stacker.content_loader.parseSlideData(data_array[1]);
      expect(row.text).toEqual("drone <span class='text-replace'>content</span>");
    });
    
    
     
  })

 
  
  

  
});