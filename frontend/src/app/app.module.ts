import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION, MatSelectModule, MatSpinner } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { IUsersRepository } from '../../../shared/repository-base/users.repository';
import { WebUsersRepository } from '../repositories/users.repository';
import { CreateHallComponent } from './create-hall/create-hall.component';
import { WebHallsRepository } from '../repositories/halls.repository';
import { IHallsRepository } from '../../../shared/repository-base/halls.repository';
import { RegisterComponent } from './register/register.component';
import { MatDatepickerModule } from "@angular/material";
import {MatNativeDateModule} from '@angular/material';

import { ViewUsersComponent } from './view-users/view-users.component';
import { IcteamNavbarComponent } from './icteam-navbar/icteam-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './events/events.component';
import { IEventsRepository } from '../../../shared/repository-base/events.repository';
import { WebEventsRepository } from '../repositories/events.repository';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateHallComponent,
    ViewUsersComponent,
    IcteamNavbarComponent,
    RegisterComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: IUsersRepository,
      useClass: WebUsersRepository
    },
    {
      provide : IEventsRepository,
      useClass : WebEventsRepository
    },
    {
      provide : IHallsRepository,
      useClass : WebHallsRepository
    },
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
