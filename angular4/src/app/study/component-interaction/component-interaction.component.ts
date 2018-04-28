import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-interaction',
  templateUrl: './component-interaction.component.html',
  styleUrls: ['./component-interaction.component.scss']
})
export class ComponentInteractionComponent implements OnInit {

  OnlineHref:string = 'https://angular.io/generated/live-examples/component-interaction/eplnkr.html';

  downloadHref:string = 'https://angular.io/generated/zips/component-interaction/component-interaction.zip';

  targetType:string = '_blank';

  constructor() { }

  ngOnInit() {
  }

}
