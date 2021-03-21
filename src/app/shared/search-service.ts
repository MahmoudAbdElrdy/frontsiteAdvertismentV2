import { Injectable } from '@angular/core';
import { ApplyForAdvertisementCommand, SearchAdvertisementCommand } from 'src/shared/service-proxies/service-proxies';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  SearchAdvertisementCommand:SearchAdvertisementCommand=new SearchAdvertisementCommand;
  constructor() { }
}
