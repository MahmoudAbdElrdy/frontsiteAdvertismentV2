import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `<app-one-column>
           <router-outlet></router-outlet>
          </app-one-column>`
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
