import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute-directives',
  templateUrl: './attribute-directives.component.html',
  styleUrls: ['./attribute-directives.component.scss']
})
export class AttributeDirectivesComponent implements OnInit {

  onLineHref:string = 'https://angular.io/generated/live-examples/attribute-directives/eplnkr.html';
  downloadHref:string = 'https://angular.io/generated/zips/attribute-directives/attribute-directives.zip';
  targetType:string = '_blank';
  constructor() { }

  ngOnInit() {
  }

}
