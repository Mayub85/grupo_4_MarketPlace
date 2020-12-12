$(document).ready(()=>{
    setupNumberInputs();
    $('.productsflexslider').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: false,
        itemWidth: 190,
        itemMargin: 5,
        maxItems: 5
      });
      productsResize();
      
    let img = $('.product img');
    console.log(img);      
    for (let i = 0; i < img.length; i++) {
      const im = img[i].parent();
      im.zoom({url: im.currentSrc});
    }
    // img.zoom({url: 'photo-big.jpg'});

    //FIX ancho del slider principal
    //setTimeout(()=>{fslider.resize();}, 200);
});


function setupNumberInputs (){
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
}