import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Hall } from '../../../../shared/domain/hall.model';
import { IHallsRepository } from '../../../../shared/repository-base/halls.repository';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.css']
})
export class CreateHallComponent implements OnInit {

  hallName = new FormControl('', [Validators.required]);
  numRowsFormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]);
  numSeatsFormControl = new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]);
  constructor(private _repo : IHallsRepository) { }

  ngOnInit() {
  }

  async createHall() : Promise<Hall>{
    let createdHall = await this._repo.createHall(new Hall(null, this.hallName.value, this.numRowsFormControl.value))
    return null;
  }
}
