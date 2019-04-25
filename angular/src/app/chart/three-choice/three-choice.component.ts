import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-three-choice',
    templateUrl: './three-choice.component.html',
    styleUrls: ['./three-choice.component.scss']
})
export class ThreeChoiceComponent implements OnInit {

    @Input()
    choiceData: any[];

    @Output() changeData: EventEmitter<any> = new EventEmitter<any>();
    

    constructor() { }

    ngOnInit() {
    }

    private choice(item) {
        this.changeData.emit(item);
    }

}
