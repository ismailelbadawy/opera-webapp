import { IUsersRepository } from "../../../shared/repository-base/users.repository";
import { User, UserType } from '../../../shared/domain/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WebUsersRepository implements IUsersRepository {
    constructor(private _client: HttpClient) {

    }
    getUserInfo() : User{
        let user = JSON.parse(localStorage.getItem('user'));
        return new User(user._userId, user._userType, user._username, user._firstName, user._lastName, user._birthDate, user._birthDate, user._city, user._email, user._address, null, null, user._approved, user._token);
    }
    async approveUser(user: import("../../../shared/domain/user.model").User): Promise<import("../../../shared/domain/user.model").User> {
        let approved = await this._client.post('/api/users/approve', { userId: user.userId }).toPromise();
        return user;
    }

    async removeUser(userId: string): Promise<boolean> {
        let response : any = await this._client.post('/api/users/delete', { userId : userId}).toPromise();
        return response != null;
    }

    async changeUserType(userId: string, usertype: UserType): Promise<User> {
        let response : any = await this._client.put('/api/users/type', { userId : userId, userType: usertype }).toPromise();
        return new User(response._userId, response._userType, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    editData(user: import("../../../shared/domain/user.model").User): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }

    async getUnapprovedUsers(): Promise<User[]> {
        var users: any = await this._client.get('/api/users/unapproved').toPromise();
        
        return users.map(s => new User(s._userId, s._userType, s._username, null, null, null, null, null, null, null, null, null, s._approved, null));
    }

    async login(username: string, password: string): Promise<import("../../../shared/domain/user.model").User> {
        let response : any = await this._client.post('/api/users/login', { username : username, password : password}).toPromise();
        let user = new User(response._userId, response._userType, response._username, response._firstName, response._lastName, response._birthDate, response._gender, response._city, response._email, response._address, null, null, response._approved, response._token);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    async register(user: import("../../../shared/domain/user.model").User, password: string): Promise<import("../../../shared/domain/user.model").User> {
        let b = {
            username : user.username,
            email : user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            birthDate: user.birthDate,
            city:user.city,
            address:user.address,
            userType:user.userType,
            password:password

        };
        console.log(b);
        let response:any = await this._client.post('/api/users',b  
        ).toPromise();
        console.log(response)
        return response
    }


}