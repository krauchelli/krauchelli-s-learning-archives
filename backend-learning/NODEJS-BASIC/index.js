const delayMakanan = (isOffline) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const variabelMakanan = ['Nasgor', 'Basreng', 'Eskrim'];

            if(typeof variabelMakanan !== "string") {
                reject(new Error("Please use string data type!"));
            }
            resolve(variabelMakanan);
        })
    }, 3000);
}

delayMakanan(false)
    .then((bisa) => console.log(bisa))
    .catch((err) => console.log(err.message));