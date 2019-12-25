import { Component, OnInit } from '@angular/core';
import { Hall } from 'shared/domain/hall.model';
import { IHallsRepository } from 'shared/repository-base/halls.repository';

@Component({
  selector: 'app-view-halls',
  templateUrl: './view-halls.component.html',
  styleUrls: ['./view-halls.component.css']
})
export class ViewHallsComponent implements OnInit {

  halls:Hall[]=[];
  hasError : boolean = false;
  isLoading : boolean = false;

  constructor(private _hallsRepo:IHallsRepository) { }

  ngOnInit() {
    this.getHalls();
  }
  async getHalls() {
    this.isLoading = true;
    try{
      let halls = await this._hallsRepo.getAllHalls();
      this.halls = halls;
    }catch(e) {
      
      this.hasError = true;
    }finally {
      this.isLoading = false;
    }

  }
}
