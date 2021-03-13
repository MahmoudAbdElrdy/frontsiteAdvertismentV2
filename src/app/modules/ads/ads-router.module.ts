
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads.component';
import { ListAdsComponent } from './listads/listads.component';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { AdsDetailsComponent } from './adsDetails/adsDetails.component';
import { SendRequestComponent } from './send-request/send-request.component';
import { AddAdsComponent } from './add-ads/add-ads.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { ServiceProviderRequestComponent } from './service-provider-request/service-provider-request.component';
import { EditAdsComponent } from './edit-ads/edit-ads.component';

const routes: Routes = [
    {
        path: '',
        component: AdsComponent,
        children: [
            {
                path: '',
                component: ListAdsComponent,
            },
            {
                path: 'list-ads',
                component: ListAdsComponent,
            },
            {
                path: 'ads-details',
                component: AdsDetailsComponent,
            },
            {
                path: 'send-request',
                component: SendRequestComponent,
            },
            {
                path: 'add-ads',
                component: AddAdsComponent,
            },
            {
                path: 'ServiceProviderRequest',
                component:ServiceProviderRequestComponent
            }
            ,
            {
                path: 'UserServices',
                component:UserServicesComponent
            }
            ,
            {
                path: 'edit-ads',
                component:EditAdsComponent
            }
            //edit-ads
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})



export class AdsRouteModule { }