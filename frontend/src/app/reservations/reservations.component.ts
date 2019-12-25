import { Component, OnInit } from '@angular/core';
import { Reservation } from 'shared/domain/reservation.model';
import { IReservationsRepository } from 'shared/repository-base/reservations.repository';
import { IUsersRepository } from 'shared/repository-base/users.repository';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations :Reservation[] = []
  hasError : boolean = false;
  isLoading : boolean = false;


  constructor(private _reservationsRepository:IReservationsRepository,private _usersRepository:IUsersRepository) { }

  ngOnInit() {
    this.getReservations();
  }

  async getReservations(){
    this.isLoading = true;
    try{
      let userInfo = await this._usersRepository.getUserInfo();
      let reservation = await this._reservationsRepository.getReservations(userInfo.userId);
      this.reservations = reservation;
      console.log(this.reservations)
    }catch(e) {
      
      this.hasError = true;
    }finally {
      this.isLoading = false;
    }
  }

}
