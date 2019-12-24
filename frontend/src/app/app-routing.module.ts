import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateHallComponent } from './create-hall/create-hall.component';

const routes: Routes = [
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'createhall',
    component: CreateHallComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
