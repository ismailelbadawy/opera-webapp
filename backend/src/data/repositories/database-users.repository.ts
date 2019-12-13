import { IUsersRepository } from 'shared/repository-base/users.repository';
import { User } from "shared/domain/user.model";
import { UserSchema } from '../schemas/user.schema';
import { model } from 'mongoose';
import { PasswordSecurer } from '../utility/password.generator';

var mongoose = require('mongoose');

const UserModel = model('user', UserSchema);

mongoose.connection;

export class DatabaseUsersRepository implements IUsersRepository {

    login(username: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    register(user: User, password : string): Promise<User> {
        return new Promise((resolve, reject) => {
            let passwordObject = new PasswordSecurer().securePassword(password);
            var userToInsert = new UserModel({
                userName: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                birthDate: user.birthDate,
                city: user.city,
                password: {
                    passwordHash: passwordObject.passwordHash,
                    passwordSalt: passwordObject.passwordSalt
                },
                address: user.address
            });
            UserModel.insertMany([
                userToInsert
            ], (err, result) => {
                if(err) {
                    reject(err);
                    return;
                }
                user.userId = result[0]._id;
                resolve(user);
            });

        });
    }

    editData(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    approveUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    removeUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    changeUserType(userId: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

}