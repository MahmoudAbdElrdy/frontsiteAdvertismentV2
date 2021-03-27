import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/@core/Component/BaseComponent/BaseComponent';
import { AppConsts } from 'src/AppConsts';

@Component({
  selector: 'app-my-account-sidebar',
  templateUrl: './my-account-sidebar.component.html',
  styleUrls: ['./my-account-sidebar.component.scss']
})
export class MyAccountSidebarComponent extends BaseComponent implements OnInit {
  ProfileImage: string;
  userName: string;
  baseUrl = AppConsts.baseUrlImage;

  constructor(private route: Router) {
    super();
   }
  ngOnInit() {
    this.ProfileImage=this.baseUrl +localStorage.getItem('user_Image')+ '?w=100&h=100';
    this.userName= localStorage.getItem('user_Name');
  }

  doLogout(){
    console.log('logout in progress');
    this.route.navigateByUrl('/pages/home');
    localStorage.clear();
  }

}
