import { PagingModel } from './common.model';

export interface contactUsSearchModel {
  paging: PagingModel;
  senderName: string;
  mobile: string;
 
}

export class ContactUsModel {
  contactUsId: number;
  senderName: string;
  mobileNumber: string;
  email: string;
  messageContent: string;
  status:string;
  statusId:number;

 
}

export interface AddEditcontactUsDto
{  
      Id       :number;
      name     :string;
     email    :string;
      address  :string;
      content  :string; 
}