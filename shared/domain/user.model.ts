export class User {
   constructor(
       private _userId:string,
       private _userType: UserType,
       private _username:string,
       private _firstName:string|null,
       private _lastName:string|null,
       private _birthDate: string|null,
       private _gender: string|null,
       private _city: string|null,
       private _email:string,
       private _address: string|null,
       private _passwordHash : string|null,
       private _paswordSalt:string|null

       ){

   } 
}

export enum UserType{
    ADMIN,
    CUSTOMER,
    MANAGER
}