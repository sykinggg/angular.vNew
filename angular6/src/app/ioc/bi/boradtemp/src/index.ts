import { ApplicationBuilder } from '@ts-ioc/platform-browser/bootstrap';

//demoe

ApplicationBuilder.create('.')
    // .use(temps)
    .build({
        token: BoradtempType.TimeLine,
        ...
    }).then(dashboard=>{
        // TODO: bind dashboard instance to NGX Compennt; 
        
    })