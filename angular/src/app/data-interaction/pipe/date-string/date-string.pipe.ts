import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateString'
})
export class DateStringPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let returnValue = '-';
        let pattern = /(\d{4})(\d{2})(\d{2})/;
        if (value) {
            returnValue = value.replace(pattern, '$1-$2-$3');
        }
        return returnValue;
    }

}
