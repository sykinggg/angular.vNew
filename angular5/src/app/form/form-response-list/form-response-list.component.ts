import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { Hero } from '../../data/data-name';
import { HeroServiceService } from '../../service/hero-service/hero-service.service';

@Component({
    selector: 'app-form-response-list',
    templateUrl: './form-response-list.component.html',
    styleUrls: ['./form-response-list.component.scss'],
    providers: [ HeroServiceService ]
})
export class FormResponseListComponent implements OnInit {

    heroes: Observable<Hero[]>;
    isLoading = false;
    selectedHero: Hero;
  
    constructor(private heroService: HeroServiceService) { }
  
    ngOnInit() { this.getHeroes(); }
  
    getHeroes() {
        this.isLoading = true;
        this.heroes = this.heroService.getHeroes()
        // Todo: error handling
        .finally(() => this.isLoading = false);
        this.selectedHero = undefined;
    }
  
    select(hero: Hero) { this.selectedHero = hero; }

}
