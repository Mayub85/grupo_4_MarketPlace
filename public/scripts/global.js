var fslider;
$(document).ready(()=>{
  if(!!$.prototype.toasty){
    $("body").toasty();
  }
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
    } else if(txt.toLowerCase() == "jero;"){
      jeroMan();
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

function closeSession(id) {
  let res = confirm("¿Está seguro?");
  if(res){
    window.location = "/users/close/" + id;
  }
}

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
 function humanFileSize(bytes, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

function checkImage(input, maxSize, regexExt, regexMsg, required=false) { 
  var files = input.files;
  var maxSize = maxSize; //bytes
  let errorCount = 0; 
  let msg = "";
  let isError = false;

  if(required && files.length == 0){
    isError = true;
    errorCount++;
    msg = "Al menos una imagen es requerida";
  }

  if(!isError){
    for(let i=0; i < files.length; i++){
      let file = files[i];
      let fileName = file.name;
      let pointIdx = fileName.lastIndexOf(".");
      let ext = fileName.substring(pointIdx+1, fileName.length)
    
      if(!regexExt.test(ext)){
        errorCount++;
        msg = regexMsg;
        isError = true;
        break;
      }
    
      if(file.size > maxSize){
        errorCount++;
        msg = `Las imágenes no pueden pesar más de ${humanFileSize(maxSize, true)}`;
        isError = true;
        break;
      }
    }
  }

  let messages = input.parentElement.getElementsByClassName("messages")[0];
  messages.innerHTML = "";
  if(isError){
    input.classList.add("has-error");
    let block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = msg;
    messages.appendChild(block);
  } else {
    input.classList.remove("has-error");
  }

  return isError ? 1 : 0;

}

/*
field: el elemento html
regex: expresión regular a utilizar
regexMsg: el mensaje a mostrar si no se cumple la condición de la regex
min: Cantidad mínima de caracteres. -1 para no permitir vacío, 0 no valida por cantidad.
fieldName: Nombre del campo a mostrar en los mensajes
Retorna: 0 si no tiene error, 1 si tiene error
*/
function checkTextField(field, regex=null, regexMsg="", min=0, fieldName=""){//min -1 es para que no esté vacío
  let isError = false;
  let error = "";
  if(min > 0){
    if(field.value.length < min){
      error = `El campo ${fieldName != "" ? fieldName + " " : fieldName}debe contener al menos ${min} caracteres`;
      isError = true;
    }
  } else if(min == -1){
    if(field.value.length == 0){
      error = `El campo ${fieldName != "" ? fieldName + " " : fieldName}no puede estar vacío`;
      isError = true;
    }
  }

  if(!isError && regex){
    if(!regex.test(field.value)){
      error = regexMsg; 
      isError = true;
    }
  }

  //encuentro al div hermano con clase messages
  let messages = field.parentElement.getElementsByClassName("messages")[0];
  messages.innerHTML = "";
  if(isError){
    field.classList.add("has-error");
    let block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  } else {
    field.classList.remove("has-error");
  }
  return isError ? 1 : 0;
}

function jeroMan(){
  let content = `
  <div id="modal">
    <div class="head">
      <div class="head-top"></div>
      <div class="head-bottom"></div>
    </div>
  </div>`;
  
  $("body").append(content);
  setTimeout(()=>{$("#modal").remove();}, 10000);
}