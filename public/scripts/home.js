var fslider;
$(document).ready(()=>{
    fslider = $('.flexslider').flexslider({
        animation: "slide",
        itemMargin: 0,
    });

    $('.productsflexslider').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
        itemWidth: 190,
        itemMargin: 5,
        maxItems: 5
      });
      productsResize();
      
    //FIX ancho del slider principal
    setTimeout(()=>{fslider.resize();}, 200);
    
});


function productsResize(){
    var currentBreakpoint; // default's to blank so it's always analysed on first load
    var didResize  = true; // default's to true so it's always analysed on first load
    var raw_slider = $(".productsflexslider").html(); // grab the unaltered HTML and store it
  
    // on window resize, set the didResize to true
    $(window).resize(function() {
      didResize = true;
    });
  
    // every 1/4 second, check if the browser was resized
    // we throttled this because some browsers fire the resize even continuously during resize
    // that causes excessive processing, this helps limit that
    setInterval(function() {
      if(didResize) {
        didResize = false;
  
        // inspect the CSS to see what breakpoint the new window width has fallen into
        var newBreakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
  
        /* tidy up after inconsistent browsers (some include quotation marks, they shouldn't) */
        newBreakpoint = newBreakpoint.replace(/"/g, "");
        newBreakpoint = newBreakpoint.replace(/'/g, "");
  
        // if the new breakpoint is different to the old one, do some stuff
        if (currentBreakpoint != newBreakpoint) {
  
            // remove the old flexslider (which has attached event handlers and adjusted DOM nodes)
            $(".productsflexslider").remove();
    
            // now re-insert clean mark-up so flexslider can run on it properly
            $(".productsSliderWrapper").append("<div class='productsflexslider'></div>");
            $(".productsflexslider").html(raw_slider);
    
            switch (newBreakpoint) {
                case 'breakpoint_1':
                    currentBreakpoint = 'breakpoint_1';
                    $(".productsflexslider").flexslider({
                      animation: "slide",
                      animationLoop: false,
                      slideshow: false,
                      itemWidth: 190,
                      itemMargin: 0,
                      minItems: 1,
                      maxItems: 1,
                      controlNav: false
                    });
                break;
                case 'breakpoint_2':
                    currentBreakpoint = 'breakpoint_2';
                    $(".productsflexslider").flexslider({
                        animation: "slide",
                        animationLoop: false,
                        slideshow: false,
                        itemWidth: 190,
                        itemMargin: 5,
                        minItems: 1,
                        maxItems: 2,
                        controlNav: false
                    });
                break;
                case 'breakpoint_3':
                    currentBreakpoint = 'breakpoint_3';
                    $(".productsflexslider").flexslider({
                        animation: "slide",
                        animationLoop: false,
                        slideshow: false,
                        itemWidth: 190,
                        itemMargin: 5,
                        minItems: 1,
                        maxItems: 3,
                        controlNav: false
                    });
                break;
                case 'breakpoint_4':
                    currentBreakpoint = 'breakpoint_4';
                    $(".productsflexslider").flexslider({
                        animation: "slide",
                        animationLoop: false,
                        slideshow: false,
                        itemWidth: 190,
                        itemMargin: 5,
                        minItems: 3,
                        maxItems: 4,
                        controlNav: false
                    });
                break;
                case 'breakpoint_5':
                    currentBreakpoint = 'breakpoint_5';
                    $(".productsflexslider").flexslider({
                      animation: "slide",
                      animationLoop: false,
                      slideshow: false,
                      itemWidth: 190,
                      itemMargin: 5,
                      minItems: 3,
                      maxItems: 5,
                      controlNav: false
                    });
                break;
            
                default:
                    break;
            }
        }
      }
    }, 250);
}


function addToFav(el){
    alert("Se añade a favoritos: " + el.attributes["class"].value);
    console.log(el);
}