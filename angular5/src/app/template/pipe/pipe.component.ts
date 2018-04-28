import { Component, OnInit } from '@angular/core';

// AsyncPipe
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-pipe',
    templateUrl: './pipe.component.html',
    styleUrls: ['./pipe.component.scss']
})
export class PipeComponent implements OnInit {

    birthday = new Date(1992, 2, 28);

    toggle = true;
    get format() {
        return this.toggle ? 'shortDate' : 'fullDate';
    }
    toggleFormat() {
        this.toggle = !this.toggle;
    }

    power: number = 5;
    factor: number = 1;

    // 无管道——激进变更检测
    heroes: any[] = [];
    canFly = true;
    constructor() {
        this.reset();
        this.resend();
    }

    addHero(name: String) {
        name = name.trim();
        if (!name) {
            return;
        }
        let hero = {
            name,
            canFly: this.canFly
        }
        this.heroes.push(hero);
    }

    reset() {
        this.heroes = this.heroes.slice();
    }

    // AsyncPipe
    message$: Observable<string>;

    private message = [
        'You are my hero!',
        'You are the best hero!',
        'Will you be my hero?'
    ]
    
    resend() {
        this.message$ = Observable.interval(500)
        .map(i => this.message[i])
        .take(this.message.length);
    }

    ngOnInit() {
    }

}
