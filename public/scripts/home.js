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


// function productsResize(){
//     var currentBreakpoint; 
//     var didResize  = true; 
//     var raw_slider = $(".productsflexslider").html(); 
  
//     $(window).resize(function() {
//       didResize = true;
//     });
  
//     setInterval(function() {
//       if(didResize) {
//         didResize = false;
  
//         var newBreakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
  
//         newBreakpoint = newBreakpoint.replace(/"/g, "");
//         newBreakpoint = newBreakpoint.replace(/'/g, "");
  
//         if (currentBreakpoint != newBreakpoint) {
//             $(".productsflexslider").remove();
    
//             $(".productsSliderWrapper").append("<div class='productsflexslider'></div>");
//             $(".productsflexslider").html(raw_slider);
    
//             switch (newBreakpoint) {
//                 case 'breakpoint_1':
//                     currentBreakpoint = 'breakpoint_1';
//                     $(".productsflexslider").flexslider({
//                       animation: "slide",
//                       animationLoop: false,
//                       slideshow: false,
//                       itemWidth: 95,
//                       itemMargin: 0,
//                       minItems: 1,
//                       maxItems: 1,
//                       controlNav: false
//                     });
//                 break;
//                 case 'breakpoint_2':
//                     currentBreakpoint = 'breakpoint_2';
//                     $(".productsflexslider").flexslider({
//                         animation: "slide",
//                         animationLoop: false,
//                         slideshow: false,
//                         itemWidth: 190,
//                         itemMargin: 5,
//                         minItems: 1,
//                         maxItems: 2,
//                         controlNav: false
//                     });
//                 break;
//                 case 'breakpoint_3':
//                     currentBreakpoint = 'breakpoint_3';
//                     $(".productsflexslider").flexslider({
//                         animation: "slide",
//                         animationLoop: false,
//                         slideshow: false,
//                         itemWidth: 190,
//                         itemMargin: 5,
//                         minItems: 1,
//                         maxItems: 3,
//                         controlNav: false
//                     });
//                 break;
//                 case 'breakpoint_4':
//                     currentBreakpoint = 'breakpoint_4';
//                     $(".productsflexslider").flexslider({
//                         animation: "slide",
//                         animationLoop: false,
//                         slideshow: false,
//                         itemWidth: 190,
//                         itemMargin: 5,
//                         minItems: 3,
//                         maxItems: 4,
//                         controlNav: false
//                     });
//                 break;
//                 case 'breakpoint_5':
//                     currentBreakpoint = 'breakpoint_5';
//                     $(".productsflexslider").flexslider({
//                       animation: "slide",
//                       animationLoop: false,
//                       slideshow: false,
//                       itemWidth: 190,
//                       itemMargin: 5,
//                       minItems: 3,
//                       maxItems: 5,
//                       controlNav: false
//                     });
//                 break;
            
//                 default:
//                     break;
//             }
//         }
//       }
//     }, 250);
// }


// function addToFav(el){
//     alert("Se añade a favoritos: " + el.attributes["class"].value);
//     console.log(el);
// }