import { Injectable } from '@angular/core';
import { ApplyForAdvertisementCommand } from 'src/shared/service-proxies/service-proxies';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {
  ApplyForAdvertisementCommand:ApplyForAdvertisementCommand=new ApplyForAdvertisementCommand;
  constructor() { }
}
