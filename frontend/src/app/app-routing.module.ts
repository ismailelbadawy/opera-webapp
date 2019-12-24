import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { IcteamNavbarComponent } from './icteam-navbar/icteam-navbar.component';

const routes: Routes = [
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: '',
    component : IcteamNavbarComponent,
    children : [
      {
        path : 'users',
        component : ViewUsersComponent
      }
    ]
  },
  {
    path : 'register',
    component : RegisterComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
