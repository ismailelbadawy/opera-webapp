import { User, UserType } from 'shared/domain/user.model';

export abstract class IUsersRepository{
    abstract approveUser(user:User):Promise<User>;
    abstract removeUser(userId:string):Promise<boolean>;
    abstract changeUserType(userId:string, usertype: UserType):Promise<User>;
    abstract editData(user:User):Promise<User>;
    abstract getUnapprovedUsers() : Promise<User[]>;
    /**Checks if the whether username and password match or not. This can also throw an exception if the username or password is wrong. */
    abstract login(username : string, password : string) : Promise<User>;
    
    /**Creates the user */
    abstract register(user : User, password : string) : Promise<User>;

    abstract getUserInfo() : Promise<User>;
}