var inputName, inputLastName, inputEmail, inputPassword, inputAvatar, btnSave, form;

window.addEventListener("load",(e)=>{ 
  inputName = document.getElementById("name"); 
  inputLastName = document.getElementById("lastName"); 
  inputEmail = document.getElementById("email");
  inputPassword = document.getElementById("password");
  inputAvatar = document.getElementById("avatar"); 
  btnSave = document.getElementById("btnSave");
  form = document.querySelector("form");
  
  btnSave.addEventListener("click",(e)=>{
    e.preventDefault();
    //let errors = [];
    let errCount = 0;
    let isError = false;

    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!.%*?&]{8,}$/;
    let messages = inputPassword.parentElement.getElementsByClassName("messages")[0];
    messages.innerHTML = "";
    if(!passRegex.test(inputPassword.value)){
      //errors.push("La contraseña debe contener 8 caracteres y al menos una mayúscula, un nro y un caracter especial.");
      isError = true;
      errCount++;
      inputPassword.classList.add("has-error");
      let block = document.createElement("p");
      block.classList.add("help-block");
      block.classList.add("error");
      block.innerText = "La contraseña debe contener 8 caracteres y al menos una mayúscula, un nro y un caracter especial.";
      messages.appendChild(block);
    } else {
      inputPassword.classList.remove("has-error");
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

      if(typeof document.getElementById("usrImage") == "undefined"){
        errCount += checkImage(inputAvatar, 2242880, /jpg|jpeg|png|gif/i, "Formatos aceptados PDF, JPG, JPEG o GIF", true);
      }
   
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
