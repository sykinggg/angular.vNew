import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { resData } from './resData';
@Injectable()
export class BaseServiceService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private heroesUrl = 'app/dataArr';  // URL to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<resData[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as resData[])
            .catch(this.handleError);
    }


    getHero(id: number): Promise<resData> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as resData)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<resData> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as resData)
            .catch(this.handleError);
    }

    update(hero: resData): Promise<resData> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
