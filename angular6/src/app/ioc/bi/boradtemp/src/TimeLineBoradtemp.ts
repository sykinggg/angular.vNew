import { Boradtemp, BoradtempType } from './Boradtemp';
import { DIModule } from '@ts-ioc/bootstrap';
import { Inject } from '@angular/core';


import * as temps from './temps';
import { Param } from '@ts-ioc/core';



@DIModule({
    provide: BoradtempType.TimeLine,
    imports: [
        temps
    ],
    providers: [

    ]
})
export class TimeLineBoradtemp extends Boradtemp {

    @Inject(Fileters.xxx);
    filter: IFilter;

    constructor(token: ClassTeest) {
        super();
    }
    export() {
        throw new Error("Method not implemented.");
    }
    refresh() {
        throw new Error("Method not implemented.");
    }

}
