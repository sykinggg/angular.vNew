import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mapInformation',
    pure: false
})
export class MapInformationPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let returnData: Object = {
            province: value.province,
            city: value.city,
            district: value.district
        }
        return JSON.stringify(returnData);
    }

}
