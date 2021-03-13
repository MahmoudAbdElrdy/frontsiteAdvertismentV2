import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';

@Component({
  selector: 'app-my-account-sidebar',
  templateUrl: './my-account-sidebar.component.html',
  styleUrls: ['./my-account-sidebar.component.scss']
})
export class MyAccountSidebarComponent extends BaseComponent implements OnInit {

  constructor(private route: Router) {
    super();
   }

  ngOnInit() {
  }

  doLogout(){
    console.log('logout in progress');
    this.route.navigateByUrl('/pages/home');
    localStorage.clear();
  }

}
