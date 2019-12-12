import { User } from 'shared/domain/user.model';

export abstract class IUsersRepository{
    abstract approveUser(user:User):Promise<User>;
    abstract removeUser(userId:string):Promise<boolean>;
    abstract changeUserType(userId:string):Promise<User>;
    abstract editData(user:User):Promise<User>;
}