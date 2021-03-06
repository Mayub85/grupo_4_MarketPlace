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

    errCount += checkImage(inputAvatar, 2242880, /jpg|jpeg|png|gif/i, "Formatos aceptados PDF, JPG, JPEG o GIF", true);
    
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
