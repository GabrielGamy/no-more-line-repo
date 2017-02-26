import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

// import "../../public/semantic/dist/semantic.min.js"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  constructor() { }

  ngOnInit() {
    console.log($('h1').offset())
  }
}
