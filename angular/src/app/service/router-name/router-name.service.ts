import { Injectable } from '@angular/core';

@Injectable()
export class RouterNameService {
    private name: string = '';
    constructor() { }
    getName(): string {
        return this.name;
    }
    setName(newTitle: string) {
        this.name = newTitle;
    }
}
