var inputEmail, inputPassword, inputPasswordConfirm, inputName, inputLastName, inputAvatar, inputCalleDeEntrega, inputCiudadDeEntrega, 
inputPaisDeEntrega, inputCPDeEntrega, btnSave, form;

window.addEventListener("load",(e)=>{ 
  inputEmail = document.getElementById("email");
  inputPassword = document.getElementById("password");
  inputPasswordConfirm = document.getElementById("repassword");
  inputName = document.getElementById("name"); 
  inputLastName = document.getElementById("lastName"); 
  inputAvatar = document.getElementById("avatar"); 
  inputCalleDeEntrega = document.getElementById("calleDeEntrega"); 
  inputCiudadDeEntrega = document.getElementById("ciudadDeEntrega"); 
  inputPaisDeEntrega = document.getElementById("paisDeEntrega"); 
  inputCPDeEntrega = document.getElementById("cpDeEntrega"); 
  btnSave = document.getElementById("btnSave");
  form = document.querySelector("form");
  
  btnSave.addEventListener("click",(e)=>{
    e.preventDefault();
    let errors = [];
    let errCount = 0;

    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!.%*?&]{8,}$/;
    let isError = false;
    if(!passRegex.test(inputPassword.value)){
      errors.push("La contraseña debe contener 8 caracteres y al menos una mayúscula, un nro y un caracter especial.");
      isError = true;
    }else if(inputPassword.value != inputPasswordConfirm.value){
      errors.push("Las contraseñas no coinciden.");
      isError = true;
    }

    let messages = inputPassword.parentElement.getElementsByClassName("messages")[0];
    messages.innerHTML = "";
    if(isError){
      inputPassword.classList.add("has-error");
      inputPasswordConfirm.classList.add("has-error");
      for (let i = 0; i < errors.length; i++) {
        const err = errors[i];
        let block = document.createElement("p");
        block.classList.add("help-block");
        block.classList.add("error");
        block.innerText = err;
        messages.appendChild(block);
      }
      errCount++;
    } else {
      inputPassword.classList.remove("has-error");
      inputPasswordConfirm.classList.remove("has-error");
    }
   

    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    errCount += checkTextField(inputEmail, 
      regexEmail,
      "Escriba un email válido.",
      0,
      "Email");

    let regexName_Last = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    errCount += checkTextField(inputName, 
      regexName_Last,
      "El campo Nombre solo acepta letras.",
      2,
      "Nombre");
    errCount += checkTextField(inputLastName, 
      regexName_Last,
      "El campo Apellido solo acepta letras.",
      2,
      "Apellido");
    
    errCount += checkTextField(inputCalleDeEntrega, 
      null,
      "",
      5,
      "Dirección de entrega");

    errCount += checkTextField(inputCiudadDeEntrega, 
      null,
      "",
      3,
      "Ciudad de entrega");

    errCount += checkTextField(inputPaisDeEntrega, 
      null,
      "",
      4,
      "País de entrega");

    errCount += checkTextField(inputCPDeEntrega, 
      null,
      "",
      4,
      "CP de entrega");
   
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

function deleteUserImage(id, filename){
  if(filename == "default.jpg"){
    alert("No se puede borrar la imagen por defecto");
    return;
  }
  let res = confirm("¿Está seguro que desea eliminar la imagen?");
  console.log(`${id, filename}`);
  if(res){
      $.ajax({
          url: `/admin/userImageDelete/${id}/${filename}`,
          type: 'POST',
          success: function(result) {
              let url = window.location.href.split("?")[0];
              window.location = `${url}?state=1&id=${id}`;
          },
          error: function(result) {
              console.log(result);
              let url = window.location.href.split("?")[0];
              window.location = `${url}?state=0&id=${id}&showMessage=1&msg=${result.responseJSON.message}`;
          }
      });
  }
}
