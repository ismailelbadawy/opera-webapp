import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export class PasswordSecurer {
    securePassword(rawPassword: string): Password {
        let salt = genSaltSync(11);
        let hash = hashSync(rawPassword, salt);
        return new Password(salt, hash);
    }

    comparePassword(data: string, password: Password): boolean {
        return compareSync(data, password.passwordHash);
    }
}

export class Password {
    
    public get passwordHash(): string {
        return this._passwordHash;
    }

    public set passwordHash(value: string) {
        this._passwordHash = value;
    }
    
    public get passwordSalt(): string {
        return this._passwordSalt;
    }
    
    public set passwordSalt(value: string) {
        this._passwordSalt = value;
    }

    constructor(private _passwordSalt: string, private _passwordHash: string) {
        
    }
}