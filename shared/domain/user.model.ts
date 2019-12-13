export class User {
    public get paswordSalt(): string | null {
        return this._paswordSalt;
    }
    public set paswordSalt(value: string | null) {
        this._paswordSalt = value;
    }
    public get passwordHash(): string | null {
        return this._passwordHash;
    }
    public set passwordHash(value: string | null) {
        this._passwordHash = value;
    }
    public get address(): string | null {
        return this._address;
    }
    public set address(value: string | null) {
        this._address = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get city(): string | null {
        return this._city;
    }
    public set city(value: string | null) {
        this._city = value;
    }
    public get gender(): string | null {
        return this._gender;
    }
    public set gender(value: string | null) {
        this._gender = value;
    }
    public get birthDate(): string | null {
        return this._birthDate;
    }
    public set birthDate(value: string | null) {
        this._birthDate = value;
    }
    public get lastName(): string | null {
        return this._lastName;
    }
    public set lastName(value: string | null) {
        this._lastName = value;
    }
    public get firstName(): string | null {
        return this._firstName;
    }
    public set firstName(value: string | null) {
        this._firstName = value;
    }
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    public get userType(): UserType {
        return this._userType;
    }
    public set userType(value: UserType) {
        this._userType = value;
    }
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
   constructor(
       private _userId: string|null,
       private _userType: UserType,
       private _username: string,
       private _firstName: string | null,
       private _lastName: string | null,
       private _birthDate: string | null,
       private _gender: string | null,
       private _city: string | null,
       private _email: string,
       private _address: string | null,
       private _passwordHash: string | null,
       private _paswordSalt: string | null

       ){

   } 
}

export enum UserType{
    ADMIN,
    CUSTOMER,
    MANAGER
}