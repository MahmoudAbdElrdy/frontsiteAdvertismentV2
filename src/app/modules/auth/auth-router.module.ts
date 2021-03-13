
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
//import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginBackComponent } from './login-back/login-back.component';
import { AuthGuard } from 'src/app/shared/AuthGuard';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            // {
            //     path: '',
            //     component: LoginComponent,
            // },
            // {
            //     path: 'login',
            //     component: LoginComponent,
            // },
            // {
            //     path: 'register',
            //     component: RegisterComponent
            // },
            // {
            //     path: 'LoginBack',
            //     component: LoginBackComponent
            // }
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})



export class AuthRouteModule { }