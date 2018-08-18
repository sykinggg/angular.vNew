import { Injectable } from '@angular/core';
var html2canvas = require('html2canvas');

@Injectable()


export class CBoardKpiRenderService {

    constructor () {}

    container;
    options;
    html2canvas;
    public CBoardKpiRender(jqContainer, options) {
        this.container = jqContainer; // jquery object
        this.options = options;

        return this;
    };

    html(persist) {
        var self = this;
        var temp: any = "" + self.template;
        var html = temp.render(self.options);
        if (persist) {
            setTimeout(function () {
                self.container.css('background', '#fff');
                // html2canvas api改变
                // self.html2canvas(self.container);
                // console.log('CBoardKpiRender');
                // console.log(self.container);
                // html2canvas(self.container).then((res: any) => {
                //     console.log(res);
                // })
            }, 1000);
            persist.data = {name: self.options.kpiName, value: self.options.kpiValue};
            persist.type = "kpi";
        }
        return html;
    };
    
    realTimeTicket() {
        var self = this;
        return function (o) {
            $(self.container).find('h3').html(o.kpiValue);
        }
    };
    
    do() {
        var self = this;
        $(self.container).html(self.rendered());
    };
    
    template = `<div class="jumbotron pt-2 px-2 pb-0 mb-0 rounded-0 {style}" style="position: relative; overflow: hidden;">
    <h3 class="p-2 h1"><strong>{kpiValue}</strong></h3>
    <p class="p-2 mb-4">{kpiName}</p>
    <i class="fa fa-signal fa-3x text-muted position-absolute" aria-hidden="true" style="top: 50%; right: 0.5rem; margin-top: -0.75em; opacity: 0.4;"></i>
    </div>`;
}
