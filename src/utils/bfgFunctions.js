const bfgFunctions = {
    imagesParser: (arr) => {
        for (let i = 0; i < arr.length; i++) { //ESTE FOR lo hice para convertir la columna Images (que es un texto), a un array de strings
            let prod = arr[i];
            if (prod.Images && prod.Images.length > 0) {
                prod.Images = JSON.parse(prod.Images);
            }
        }
    },
    
    getRandomArbitrary:(min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    },

    fakeRemoveProducts:(arr) =>{
        let rnd = Math.floor(Math.random() * (arr.length - 0) + 0);
        let newArr = arr.map(e=> e);
        for (let i=0; i<rnd; i++) {
            newArr.pop();
        }
        return newArr;
    },
    
}

module.exports = bfgFunctions;