import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
    providedIn: 'root',
})

export class MenuService {
    private menuList: Array<any>;
    categoriesSubject: BehaviorSubject<any>;
    boardsSubject: BehaviorSubject<any>;
    reportsSubject: BehaviorSubject<any>;

    constructor() {
        this.menuList = [];
        this.categoriesSubject = new BehaviorSubject<Array<any>>([]);
        this.boardsSubject = new BehaviorSubject<Array<any>>([]);
        this.reportsSubject = new BehaviorSubject<Array<any>>([]);
    }

    isShowMenu(code) {
        return this.menuList.some((menu) => {
            return menu.menuCode === code;
        });
    }

    getMenu() {
        return this.menuList;
    }

    setMenu(menu) {
        this.menuList = menu;
    }
}