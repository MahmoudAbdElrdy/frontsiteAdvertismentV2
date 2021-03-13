import { PagingModel } from './common.model';


export interface AccountDto{
    accountId : number;
    pinCode:number;
    isActive:boolean;
    accountName : string;
    imageUrl:string;
    hoverImageUrl: string
}

export interface AccountVerificationDto{
    accountId : number;
    pinCode : string;
   
}

export interface SubAccountDto{
    subAccountId : number;
    subAccountName : string;
    subAccountNumber:number;
}


export interface AccountSearchDto{
    accountName : string;
    paging: PagingModel;
}

export interface SubAccount{
    accountId : number;
    subAccountId : number;
    accountName:string;
    subAccountName : string;
    subAccountNumber:string;
    isActive:boolean;
}

export interface SearchSubAccountDto{
    paging: PagingModel;
    accountId? : number;
    subAccountName : string;
    subAccountNumber:string;
}