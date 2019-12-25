import { Component, OnInit } from '@angular/core';
import { IEventsRepository } from '../../../../shared/repository-base/events.repository';
import { Event } from "../../../../shared/domain/event.model";
import { IUsersRepository } from '../../../../shared/repository-base/users.repository';
import { UserType } from 'shared/domain/user.model';
import { Hall } from 'shared/domain/hall.model';
import { FormControl, Validators } from '@angular/forms';
import { IHallsRepository } from 'shared/repository-base/halls.repository';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events : Event[] = [];
  halls : Hall[] = [];
  hasError : boolean = false;
  isLoading : boolean = false;
  addingEvent : boolean = false;
  buttonText : string = 'Add New Event'
  defaultDate : Date = new Date();
  isOperaManager;
  
  // Add event info form controls
  eventNameFormControl = new FormControl('', [Validators.required]);
  startsAtFormControl = new FormControl('', [Validators.required]);
  hallFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  constructor(private _repo : IEventsRepository, private _usersRepo : IUsersRepository, private _hallsRepo : IHallsRepository) { 
    this.isOperaManager = (this._usersRepo.getUserInfo()).userType == UserType.MANAGER;
    
  }

  ngOnInit() {
    this.getEvents();
  }

  toggleEdit() {
    this.addingEvent = !this.addingEvent;
    this.buttonText = this.buttonText == 'Add New Event' ? 'Cancel' : 'Add New Event';
  }

  async getEvents() {
    this.isLoading = true;
    try{
      let events = await this._repo.viewAvailableEvents();
      let halls = await this._hallsRepo.getAllHalls();
      this.events = events;
      this.halls = halls;
      console.log(this.halls);
    }catch(e) {
      console.log(e);
      this.events = [
        new Event('0', 'Event 1', 'This is balabalanlanna', 'https://cdn.onebauer.media/one/media/5ba3/5b31/f66f/976b/9eb5/3920/ed-sheeran-art-1.jpg?quality=80&width=960&ratio=16-9&resizeStyle=aspectfill&format=jpg', new Date(2019, 12, 26), new Hall('0', 'NANI', 30), []),
        new Event('1', 'Event 2', 'This is another bla bla bla blac', 'https://cdn3-www.musicfeeds.com.au/assets/uploads/Amity-Shirts-671x377-Cropped-671x377.jpg', new Date(2019, 12, 29, 10, 30), null, null)
      ];
      this.halls = [
        new Hall('0', 'Main Hall', 30)
      ];
      this.hasError = true;
    }finally {
      this.isLoading = false;
    }

  }

  async addEvent() {
    try{
      console.log(this.startsAtFormControl.value);
      if(!this.startsAtFormControl.valid || !this.descriptionFormControl.valid || !this.eventNameFormControl.valid || !this.hallFormControl.valid) {
        
        return;
      }
      
      let response = await this._repo.createEvent(new Event(null, this.eventNameFormControl.value, this.descriptionFormControl.value, null, this.startsAtFormControl.value, new Hall(this.hallFormControl.value, null, null), null));
      this.events.push(response);
      this.toggleEdit();
    }catch(e) {
      alert(`Cannot create this event`);
    }
  }

  async cancelEvent(eventId : string) {
    try{
      let response = await this._repo.cancelEvent(eventId);
      this.events.splice(this.events.findIndex(z => z.eventId == eventId), 1);
    }catch(e) {
      alert(`Cannot remove ${this.events.find(z => z.eventId == eventId).eventName}`);
    }
  }

  navigateToEvent(eventId : string) {
    console.log(`Should Navigate`);
  }
}
