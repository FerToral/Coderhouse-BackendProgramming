const fs = require('fs');

const lecturaYescrituraAsincronas = async() =>{
    const packagejsonInfo = await fs.promises.readFile('./package.json','utf-8')
    const packegejsonInfoObj = JSON.parse(packagejsonInfo);
    const info = {
        contenmidoStr: packagejsonInfo,
        contenidoObj: packegejsonInfoObj,
        size: ''
    };
    console.log(info);
    fs.promises.writeFile('./info',JSON.stringify(info)).catch(
        (error)=>{
            if(error)throw new Error('No se cargo el archivo')
        });

}

lecturaYescrituraAsincronas();