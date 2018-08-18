import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class MenuService {
    private menuList;
    categoriesSubject: BehaviorSubject<any>;
    boardsSubject: BehaviorSubject<any>;
    reportsSubject: BehaviorSubject<any>;
    constructor();
    isShowMenu(code: any): boolean;
    getMenu(): any[];
    setMenu(menu: any): void;
}
