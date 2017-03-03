import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cobalt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  
  constructor() { }

  ngOnInit() {
    console.log($('h1').offset())
    console.log($('.ui.dropdown').dropdown())
  }
}
