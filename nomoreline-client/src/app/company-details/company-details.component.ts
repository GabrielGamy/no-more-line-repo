import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nomoreline-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.autumn.leaf').transition('fly left')
  }

}
