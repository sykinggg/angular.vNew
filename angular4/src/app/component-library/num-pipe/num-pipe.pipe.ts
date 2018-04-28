import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numPipe'
})
export class NumPipePipe implements PipeTransform {

    transform(value: any, args?: number): any {
        if (isNaN(value)) {
            return null
        } else {
            let numStr: String, numData: number;
            if (args === 0) {
                return value | 0
            } else {
                numStr = value + '';
                if(numStr.split('.')[1]&&numStr.split('.')[1].length) {
                    numData = +numStr.substring(0, numStr.indexOf('.')+args+1);
                }
            }
        }
    }

}
