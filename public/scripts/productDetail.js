$(document).ready(()=>{
    setupNumberInputs();
    let fslider = $('.flexsliderProduct').flexslider({
        animation: "slide",
        slideshow: false,
        itemMargin: 0,
        itemWidth: 500,
      });
      //productsResize();
      setupZoom ();

      $( function() {
        $(".tabs").tabs();
      });
    //FIX ancho del slider principal
    setTimeout(()=>{fslider.resize();}, 200);
    $("#btnCart").on('click', ()=>{
      addToCart();
   });
});

function addToCart(){
  let urlSplitted = window.location.href.split("/");
  let id = urlSplitted[urlSplitted.length -1].split("?")[0];
  let prodQty = document.getElementById("prodQty");
  let qty = prodQty && typeof prodQty != "undefined" ? parseInt(prodQty.value) : 1; 
  $.ajax({
      url: `/products/cart/add/${id}/${qty}`,
      type: 'POST',
      success: function(result) {
        if(JSON.parse(result).status == 204){
          window.location = `/users`;
        }else{
          window.location = `/products/cart`;
        }
      },
      error: function(result) {
          console.log(result);
          window.location = `/error`;
      }
  });
}


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

function setupZoom (){
  $("img[id^=pim-]").each((i, img)=>{
      $(img)    
      .wrap('<span style="display:inline-block"></span>')
      .css('display', 'block')
      .parent()
      .zoom();
    }
  )
}