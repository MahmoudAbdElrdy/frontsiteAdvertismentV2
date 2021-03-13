import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads',
  template: `<app-one-column>
           <router-outlet></router-outlet>
          </app-one-column>`
})
export class AdsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
