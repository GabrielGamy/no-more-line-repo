import { Component, OnInit } from '@angular/core';

interface ICompanies {
  name: string
}

@Component({
  selector: 'nomoreline-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companies: ICompanies [] = []

  constructor() { }

  ngOnInit() {
    for(let index = 0; index < 100; index++) {
      this.companies.push(
        { name: "Company " + (index + 1) }
      )
    }
  }

}
