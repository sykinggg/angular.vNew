import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

import { ComponentInteractionService } from '../../../service/component-interaction/component-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-component-interaction-child',
    templateUrl: './component-interaction-child.component.html',
    styleUrls: ['./component-interaction-child.component.scss']
})
export class ComponentInteractionChildComponent implements OnInit {

    private _name: String;

    @Input()
    set name(name: String) {
        this._name = (name && name.trim()) || 'Illidan';
    }
    get name(): String {
        return this._name
    }

    @Input()
    content: String;

    @Input()
    logShow: Boolean = false;

    @Input()
    buttonShow: Boolean = false;

    @Input()
    serviceShow: Boolean = false;

    // @Input() astronaut: string;
    // mission = '<no mission announced>';
    // confirmed = false;
    // announced = false;
    // subscription: Subscription;

    @Output() onVoted = new EventEmitter<boolean>();
    voted = false;

    setVote(agreed: boolean) {
        this.onVoted.emit(agreed);
        this.voted = true;
    }

    changeLog: string[] = [];

    // 父组件与子组件通过本地变量互动
    intervalId = 0;
    message = '';
    seconds = 11;

    clearTimer() { clearInterval(this.intervalId); }

    start() { this.countDown(); }
    stop() {
        this.clearTimer();
        this.message = `Holding at T-${this.seconds} seconds`;
    }
    private countDown() {
        this.clearTimer();
        this.intervalId = window.setInterval(() => {
            this.seconds -= 1;
            if (this.seconds === 0) {
                this.message = 'Blast off!';
            } else {
                if (this.seconds < 0) { this.seconds = 10; } // reset
                this.message = `T-${this.seconds} seconds and counting`;
            }
        }, 1000);
    }

    constructor(private missionService: ComponentInteractionService) {
        // this.subscription = missionService.missionAnnounced$.subscribe(
        //     mission => {
        //         this.mission = mission;
        //         this.announced = true;
        //         this.confirmed = false;
        //     });
    }

    // confirm() {
    //     this.confirmed = true;
    //     this.missionService.confirmMission(this.astronaut);
    // }

    ngOnInit() {
        this.start();
    }
    ngOnDestroy() {
        this.clearTimer();
        // prevent memory leak when component destroyed
        // this.subscription.unsubscribe();
    }
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        // console.log(this.name);
        // console.log(this.content);
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            let to = JSON.stringify(changedProp.currentValue);
            if (changedProp.isFirstChange()) {
                log.push(`Initial value of ${propName} set to ${to}`);
            } else {
                let from = JSON.stringify(changedProp.previousValue);
                log.push(`${propName} changed from ${from} to ${to}`);
            }
        }
        this.changeLog = log;
        // this.changeLog.push(log.join(', '));
    }

}
