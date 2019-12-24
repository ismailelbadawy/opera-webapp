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
import { CreateHallComponent } from './create-hall/create-hall.component';
import { WebHallsRepository } from '../repositories/halls.repository';
import { IHallsRepository } from '../../../shared/repository-base/halls.repository';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateHallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: IUsersRepository,
      useClass : WebUsersRepository
    },
    {
      provide : IHallsRepository,
      useClass : WebHallsRepository
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
