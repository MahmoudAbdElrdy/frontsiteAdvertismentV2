import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `<app-one-column>
           <router-outlet></router-outlet>
          </app-one-column>`
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
