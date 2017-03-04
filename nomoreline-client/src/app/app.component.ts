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
    
    $('.ui.dropdown').dropdown()

    $('#nomoreline-app .ui.sidebar')
    .sidebar({
      context: $('#nomoreline-app .bottom.segment')
    })
    .sidebar('attach events', '#nomoreline-app .menu .item .content.icon', 'toggle')    
  }
}
