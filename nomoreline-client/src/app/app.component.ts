import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nomoreline-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  
  constructor() { }

  ngOnInit() {
    
    $('.ui.dropdown').dropdown()

    $('#nomoreline-app .ui.left.sidebar')
    .sidebar({
      dimPage: false,
      context: $('#nomoreline-app .bottom.segment')
    })
    .sidebar('setting', 'transition', 'overlay')    
    .sidebar('attach events', '#nomoreline-app .content.icon', 'toggle')

    $('#nomoreline-app .ui.right.sidebar')
    .sidebar({
      dimPage: false,
      context: $('#nomoreline-app .bottom.segment')
    })
    .sidebar('setting', 'transition', 'overlay')
    .sidebar('attach events', '#nomoreline-app .search.icon', 'toggle')
  }
}
