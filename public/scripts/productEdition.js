var name, shortDescription, brand, code, largeDescription, specs, price, images, productType, productState, btnSave, form;

window.addEventListener("load",(e)=>{ 
  inputName = document.getElementById("name");
  inputShortDescription = document.getElementById("shortDescription");
  // selBrand = document.getElementById("brand");
  inputCode = document.getElementById("code"); 
  inputLargeDescription = document.getElementById("largeDescription"); 
  inputSpecs = document.getElementById("specs"); 
  inputPrice = document.getElementById("price");
  inputImages = document.getElementById("images"); 
  // selProductType = document.getElementById("productType"); 
  // selProductState = document.getElementById("productState"); 
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
    
    if(typeof document.getElementById("preImages") == "undefined" || document.getElementById("preImages") == null){
      errCount += checkImage(inputImages, 5242880, /jpg|jpeg|png|gif/i, "Formatos aceptados PDF, JPG, JPEG o GIF", true);
    }

    if(errCount == 0){
      form.submit();
    }

  });
    
});

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
    if(!regex.test(parseFloat(field.value))){
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
