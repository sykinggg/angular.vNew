import { Component, OnInit } from '@angular/core';
import { AiIndexService } from '../jsAiServer';

@Component({
    selector: 'app-js-ai',
    templateUrl: './js-ai.component.html',
    styleUrls: ['./js-ai.component.scss']
})
export class JsAiComponent implements OnInit {

    constructor(
        public aiIndexService: AiIndexService,
    ) { 

    }

    ngOnInit() {
    }

    public testBtn() {
        this.aiIndexService.training();
    }

}
