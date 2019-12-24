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

    login(username: string, password: string): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }

    register(user: import("../../../shared/domain/user.model").User, password: string): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }


}