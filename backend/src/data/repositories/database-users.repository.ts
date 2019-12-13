import { IUsersRepository } from 'shared/repository-base/users.repository';
import { User } from 'shared/domain/user.model';

export class DatabseUsersRepository extends IUsersRepository{
    approveUser(user:User): Promise<User> {
        throw new Error("Method not implemented.");
    }    
    removeUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    changeUserType(userId: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    editData(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    login(username: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    register(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }


}