import { ApplicationBuilder } from '@ts-ioc/platform-browser/bootstrap/lib';
import { WidgetType } from './Widget'

//demoe

ApplicationBuilder.create('.')
    // .use(temps)
    .build({
        token: WidgetType.type,
        ...
    }).then(dashboard=>{
        // TODO: bind dashboard instance to NGX Compennt; 
        
    })