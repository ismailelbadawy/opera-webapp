import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatInputModule, MatButtonModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { IUsersRepository } from '../../../shared/repository-base/users.repository';
import { WebUsersRepository } from '../repositories/users.repository';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: IUsersRepository,
      useClass : WebUsersRepository
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
