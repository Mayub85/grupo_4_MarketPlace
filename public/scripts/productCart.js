$(document).ready(()=>{
    setupNumberInputs();
    // $('.productsflexslider').flexslider({
    $('#Slider').flexslider({
      animation: "slide",
      controlNav: false,
      slideshow: false,
      itemWidth: 190,
      itemMargin: 5,
      maxItems: 5
    });
    productsResize();
    getTotal();
});

function getTotal(){
  let total = 0;
  $("span[id^=product_total_]").each(function(){
    total += parseFloat($(this).get(0).innerText);
  });
  $("#total").get(0).innerHTML = total;
}

function removeCart(el){
  let id = el.id;
  $.ajax({
      url: `/products/cart/remove/${id}`,
      type: 'POST',
      success: function(result) {
        if(JSON.parse(result).status == 204){
          alert(JSON.parse(result).message);
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

async function updateQty(pId, qty){
  return $.ajax({
      url: `/products/cart/updateQty/${pId}/${qty}`,
      type: 'POST',
      success: function(result) {
        if(JSON.parse(result).status == 204){
          console.log(JSON.parse(result).message);
          return false;
        }else{
          return true;
        }
      },
      error: function(result) {
          console.log(result);
          return false;
      }
  });
}

function showLoading(show){
  if(show){
    var modal = `<div class="modal" id="modal">
                  <img src="/images/marioRun.gif"/>
                </div>`;
    $("body").append(modal);
  } else {
    $("#modal").remove();
  }
}

async function setupNumberInputs (){
    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      let spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(async function() {
        showLoading(true);
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        let id = $(this).parent().parent().find("input")[0].id.split("_")[1];
        let updated = await updateQty(id, newVal);
             
        if(updated){
          spinner.find("input").val(newVal);
          spinner.find("input").trigger("change");
          let price = parseFloat($("#product_price_" + id).get(0).innerHTML);
          $("#product_total_" + id).get(0).innerHTML = (price * newVal).toFixed(2);
          getTotal();
        }

        showLoading(false);
      });

      btnDown.click(async function() {
        showLoading(true);
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        let id = $(this).parent().parent().find("input")[0].id.split("_")[1];
        let updated = await updateQty(id, newVal);

        if(updated){
          spinner.find("input").val(newVal);
          spinner.find("input").trigger("change");
          let price = parseFloat($("#product_price_" + id).get(0).innerHTML);
          $("#product_total_" + id).get(0).innerHTML = (price * newVal).toFixed(2);
          getTotal();
        }

        showLoading(false);
      });

    });
}