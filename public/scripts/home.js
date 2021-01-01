var fslider;
$(document).ready(()=>{
    fslider = $('.flexslider').flexslider({
        animation: "slide",
        itemMargin: 0,
    });

    initSlider("SliderDeals");
    initSlider("SliderNews");
    initSlider("SliderUsed");
    initSlider("SliderFeatured");
    initSlider("SliderPresale");

    productsResize();
      
    //FIX ancho del slider principal
    setTimeout(()=>{fslider.resize();}, 200);
    
});

function initSlider(sliderID){
    $(`#${sliderID}`).flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
        itemWidth: 190,
        itemMargin: 5,
        maxItems: 5
    });
}