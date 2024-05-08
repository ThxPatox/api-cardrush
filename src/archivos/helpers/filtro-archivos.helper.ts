export const filtroArchivos = (req:Express.Request, file:Express.Multer.File, callback:Function) => {
    if(!file){
        return callback(new Error('No se ha enviado ningun archivo'), false);
    }    
    const extensionesPermitidas = ['jpg','jpeg','png','webp'];
    const extension = file.mimetype.split('/')[1];
    // console.log("---------------------------",extension);
    if(extensionesPermitidas.includes(extension)){
        return callback(null, true);
    }
    callback(null, false);
}