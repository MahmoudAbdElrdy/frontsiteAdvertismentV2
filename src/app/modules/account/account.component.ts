import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  template: `<app-one-column>
                <div class="container">
                  <div class="row">              
                    <div class="col-md-3 sidebar-col"><app-my-account-sidebar></app-my-account-sidebar></div>
                    <div class="col-md-9"><router-outlet></router-outlet></div>
                  </div>
                </div>
             </app-one-column>`
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
