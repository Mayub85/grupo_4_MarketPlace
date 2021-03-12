function deleteImage(id, filename){
    let res = confirm("¿Está seguro que desea eliminar la imagen?");
    console.log(`${id, filename}`);
    if(res){
        $.ajax({
            url: `/admin/imageDelete/${id}/${filename}`,
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

function deleteUserImage(id, filename){
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
