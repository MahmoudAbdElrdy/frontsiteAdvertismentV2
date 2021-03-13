
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { NotificationsComponent } from './notifications/notifications.component';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { RequestsComponent } from './requests/requests.component';
import { ReceivedComplaintsComponent } from './received-complaints/received-complaints.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: '',
                component: MyAdsComponent,
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
            },
            {
                path: 'favorites',
                component: FavoritesComponent,
            },
            {
                path: 'my-ads',
                component: MyAdsComponent,
            },
            {
                path: 'requests',
                component: RequestsComponent,
            },
            {
                path: 'received-complaints',
                component: ReceivedComplaintsComponent,
            },
            {
                path: 'edit-profile',
                component: EditProfileComponent,
            }
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})



export class AccountRouteModule { }