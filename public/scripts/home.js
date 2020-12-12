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
