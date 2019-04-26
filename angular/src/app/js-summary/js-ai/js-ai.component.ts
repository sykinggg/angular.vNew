import { Component, OnInit } from '@angular/core';
import { AiIndexService } from '../jsAiServer/aiIndex/ai-index.service';

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
        console.log('this.aiIndexService.training();');
        this.aiIndexService.training();
        // this.doThing(10);
    }

    public doThing(n: number) {
        let a, i;
        a = setInterval(() => {
            if (n >= i) {
                this.aiIndexService.training();
                i++
            } else {
                clearInterval(a);
            }
        })
    }

}
