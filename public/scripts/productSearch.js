var fSlider;
$(document).ready(()=>{
  fSlider = $('#Slider').flexslider({
    animation: "slide",
    controlNav: false,
    slideshow: false,
    itemWidth: 190,
    itemMargin: 5,
    maxItems: 5
  });
  productsResize();
    //FIX ancho del slider principal
  setTimeout(()=>{fSlider.resize();}, 200);
});

