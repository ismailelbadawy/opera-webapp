import { Component, OnInit } from '@angular/core';
import { Event } from 'shared/domain/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventName = '7ammood'
  eventDescription = 'The eventa'
  hallNumber: number = 10
  date: Date = new Date(2020, 10, 20)
  viewDate : string = this.getDate();
  posterURL: string;
  
  constructor() {
    // this.eventName = event.eventName;
    // this.hallNumber = event.hall.hallId;
    // this.date = event.startsAt;
    // this.eventDescription = event.description;
  }

  getDate(): string {
    return (this.date.getDay().toString() + '/' + 
    this.date.getMonth().toString() + '/' + 
    this.date.getFullYear().toString());
  }

  ngOnInit() {
  }

}
