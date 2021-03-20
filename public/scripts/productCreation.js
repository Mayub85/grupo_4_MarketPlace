var name, shortDescription, brand, code, largeDescription, specs, price, images, productType, productState, btnSave, form;

window.addEventListener("load",(e)=>{ 
  inputName = document.getElementById("name");
  inputShortDescription = document.getElementById("shortDescription");
  selBrand = document.getElementById("brand");
  inputCode = document.getElementById("code"); 
  inputLargeDescription = document.getElementById("largeDescription"); 
  inputSpecs = document.getElementById("specs"); 
  inputPrice = document.getElementById("price");
  inputImages = document.getElementById("images"); 
  selProductType = document.getElementById("productType"); 
  selProductState = document.getElementById("productState"); 
  btnSave = document.getElementById("btnSave");
  form = document.querySelector("form");
  
  btnSave.addEventListener("click",(e)=>{
    e.preventDefault();
    let errCount = 0;

    errCount += checkTextField(inputName, 
      null,
      "",
      5,
      "Nombre");

    errCount += checkTextField(inputShortDescription, 
      null,
      "",
      20,
      "Descripción corta");

    //BRAND

    errCount += checkTextField(inputCode, 
      null,
      "",
      6,
      "Código");

    errCount += checkTextField(inputLargeDescription, 
      null,
      "",
      20,
      "Descripción larga");

    errCount += checkTextField(inputSpecs, 
      null,
      "",
      20,
      "Especificaciones técnicas");

    //CASO ESPECIAL
    errCount += checkPriceField(inputPrice, 
      /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/,
      "Debe ingresar un precio válido",
      0.01,
      "Precio");
    
    errCount += checkImage(inputImages, 5242880, /jpg|jpeg|png|gif/i, "Formatos aceptados PDF, JPG, JPEG o GIF");

    //PRODUCT TYPE


    //PRODUCT STATE
   
    if(errCount == 0){
      form.submit();
    }

  });
    
});


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


function checkPriceField(field, regex=null, regexMsg="", min, fieldName=""){
  let isError = false;
  let error = "";
  if(min > 0){
    if(parseFloat(field.value) < min){
      error = `El campo ${fieldName != "" ? fieldName + " " : fieldName}debe ser mayor a ${min}`;
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


function checkImage(input, maxSize, regexExt, regexMsg) { //Esta función validaría una imágen
  var files = input.files;
  var maxSize = maxSize; //bytes
  let errorCount = 0; 
  let msg = "";
  let isError = false;

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
      msg = "Las imágenes no pueden pesar más de 5MB";
      isError = true;
      break;
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