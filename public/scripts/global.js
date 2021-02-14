var fslider;
$(document).ready(()=>{
    $("body").toasty();
    $('#sandwich').on( "click", function() {
        $("#menu").slideToggle();
    });
    
    $('#inputSearch').keyup(function(e){ 
        var code = e.key;
        if(code==="Enter") e.preventDefault();
        if(code===" " || code==="Enter" || code===","|| code===";"){
            search();
        } 
    });

    $('#btnSearch').on('click', ()=>{
       search();
    });
});

function search(){
    let txt = $("#inputSearch").val();
    if(txt.toLowerCase() == "herni!"){
      $("body").toasty('pop');
    }else{
      window.location = "/products/search?q=" + txt;
    }
}

function productsResize(){
    var currentBreakpoint; 
    var didResize  = true; 
    var raw_slider = $(".productsflexslider").html(); 
  
    $(window).resize(function() {
      didResize = true;
    });
  
    setInterval(function() {
      if(didResize) {
        didResize = false;
  
        var newBreakpoint = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
  
        newBreakpoint = newBreakpoint.replace(/"/g, "");
        newBreakpoint = newBreakpoint.replace(/'/g, "");
  
        if (currentBreakpoint != newBreakpoint) {
            $(".productsflexslider").remove();
    
            $(".productsSliderWrapper").append("<div class='productsflexslider'></div>");
            $(".productsflexslider").html(raw_slider);
    
            switch (newBreakpoint) {
                case 'breakpoint_1':
                    currentBreakpoint = 'breakpoint_1';
                    $(".productsflexslider").flexslider({
                      animation: "slide",
                      animationLoop: false,
                      slideshow: false,
                      itemWidth: 190,//95,
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


var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
  };
  
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
  let kCode = typeof(e.keyCode) != "undefined" ? e.keyCode : e.code;
  var key = allowedKeys[e.keyCode];
  var requiredKey = konamiCode[konamiCodePosition];

  if (key == requiredKey) {
    konamiCodePosition++;
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});
  
function activateCheats() {
  var audio = new Audio('/audio/eegg.mp3');
  audio.play();
  document.body.style.backgroundImage = "url('/images/fede.jpg')";
  document.body.style.backgroundRepeat = "repeat";
  document.body.style.backgroundSize = "auto";
}