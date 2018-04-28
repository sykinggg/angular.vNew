import { Pipe, PipeTransform } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Pipe({
    name: 'pipeHttp',
    pure: false
})
export class PipeHttpPipe implements PipeTransform {

    private cacheData: any = null;
    private cacheUrl: any = '';

    constructor(private http: Http) { }

    transform(url: String): any {
        if (url !== this.cacheUrl && typeof url === 'string') {
            this.cacheData = null;
            this.cacheUrl = url;
            this.http.get(url)
                .map(result => result.json())
                .subscribe(result => this.cacheData = result);
        }

        return this.cacheData;
    }

}
