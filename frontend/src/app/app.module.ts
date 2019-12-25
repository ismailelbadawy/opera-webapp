import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MAT_CHECKBOX_CLICK_ACTION, MatSelectModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { IUsersRepository } from '../../../shared/repository-base/users.repository';
import { WebUsersRepository } from '../repositories/users.repository';
import { RegisterComponent } from './register/register.component';
import { MatDatepickerModule } from "@angular/material";
import {MatNativeDateModule} from '@angular/material';

import { ViewUsersComponent } from './view-users/view-users.component';
import { IcteamNavbarComponent } from './icteam-navbar/icteam-navbar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewUsersComponent,
    IcteamNavbarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: IUsersRepository,
      useClass: WebUsersRepository
    },
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
