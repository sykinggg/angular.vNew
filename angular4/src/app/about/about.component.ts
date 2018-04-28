import { Component, OnInit } from '@angular/core';

import { fadeIn } from '../animations/fade-in';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
  // animation: [ fadeIn ]
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
