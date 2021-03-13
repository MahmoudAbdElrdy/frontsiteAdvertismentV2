
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './home/index/index.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from 'src/app/shared/AuthGuard';
import { UsingInstructionsComponent } from './usinginstructions/usinginstructions.component';
import { PrivacyPolicyComponent } from './privacypolicy/privacypolicy.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                component: IndexComponent,
            },
            {
                path: 'home',
                component: IndexComponent,
            },
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'using-instructions',
                component: UsingInstructionsComponent,
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent,
            }
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})



export class PagesRouteModule { }