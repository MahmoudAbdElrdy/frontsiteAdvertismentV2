import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../BaseComponent/BaseComponent';

@Component({
  selector: 'app-success-msg',
  templateUrl: './success-msg.component.html',
  styleUrls: ['./success-msg.component.scss']
})
export class SuccessMsgComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
