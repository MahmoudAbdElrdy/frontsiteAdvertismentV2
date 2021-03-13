import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader-component',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  color = 'success';
  mode = 'indeterminate';
  value = 50;
  constructor(private loaderService: LoaderService) { }
}
