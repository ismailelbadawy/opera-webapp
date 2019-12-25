import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { IcteamNavbarComponent } from './icteam-navbar/icteam-navbar.component';
import { EventsComponent } from './events/events.component';
import { CreateHallComponent } from './create-hall/create-hall.component';
import { ViewHallsComponent } from './view-halls/view-halls.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path:'event-details',
    component: EventDetailsComponent
  },
  {
    path: '',
    component : IcteamNavbarComponent,
    children : [
      {
        path : 'users',
        component : ViewUsersComponent
      },
      {
        path: 'events',
        component : EventsComponent
      },
      {
        path: 'halls/create',
        component: CreateHallComponent
      },
      {
        path:'halls',
        component: ViewHallsComponent
      },
      {
        path: 'reservations',
        component: ReservationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
