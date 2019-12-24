import { Component, OnInit } from '@angular/core';
import { IUsersRepository } from '../../../../shared/repository-base/users.repository';
import { User, UserType } from "../../../../shared/domain/user.model";
import { type } from 'os';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  unapproved : User[];
  approved : User[];
  types = [
    {
      value : 1,
      name : "Customer"
    },
    {
      value : 0,
      name: 'Site Adminstrator'
    },
    {
      value : 2,
      name: 'Opera Manager'
    }
  ];
  constructor(
    private _repo : IUsersRepository
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    try{
      let users = await this._repo.getUnapprovedUsers();
      console.log(users)
      this.unapproved = users.filter(s => !s.approved);
      this.approved = users.filter(s => s.approved);
    }catch(e) {
      this.unapproved = [];
      this.approved = [
        new User('1', UserType.ADMIN, 'ismailelbadawy', 'Ismail', 'Khalil', '', 'male', 'Cairo', 'ismailelbadawy@yahoo.com', '0r1h8rh10r1', null, null, true, null)
      ];
    }
  }

  async approveUser(userId : string) {
    try{
      let response = await this._repo.approveUser(new User(userId, null, null, null, null, null, null, null ,null, null, null, null, null, null));
      
      let user = this.unapproved.splice(this.unapproved.findIndex(z => z.userId == userId), 1);
      this.approved.push(user[0]);
    }catch(e) {
      alert(`Cannot approve the user with id : ${userId}`);
    }
  }

  async changeUserType(userId : string, newType : UserType) {
    console.log(`${userId} to type ${newType}`);
    try{
      let newUser = await this._repo.changeUserType(userId, newType);
      this.approved.find(s => s.userId == userId).userType = newType;
      console.log(newUser);
    }catch(e) {
      alert(`Cannot change type for user with id : ${userId}`);
    }
  }

  getTypeName(userType : UserType) : string {
    return this.types.find(s => s.value == userType).name;
  }

  async remove(userId) {
    try{
      let response = await this._repo.removeUser(userId);
      this.approved.splice(this.approved.findIndex(x => x.userId == userId), 1);
    }catch(e) {
      alert(`Cannot remove this user with id : ${userId}`);
    }
  }
}
