import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost, IGet } from './IHttp';
import { httpConfig } from './http.config';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private http: HttpClient,
    ) { }

    public post(data: IPost) {
        const url = httpConfig.api.servers.address + data.api;
        return this.http.post(url, data.data);
    }

    public get(data: IGet) {
        const url = httpConfig.api.servers.address + data.api;
        return this.http.get(url);
    }
}
