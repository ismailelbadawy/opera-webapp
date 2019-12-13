import { IUsersRepository } from 'shared/repository-base/users.repository';
import { User, UserType } from "../../../../shared/domain/user.model";
import { UserSchema } from '../schemas/user.schema';
import { model } from 'mongoose';
import { PasswordSecurer, Password } from '../utility/password.generator';

var mongoose = require('mongoose');

const UserModel = model('user', UserSchema);

mongoose.connection;

export class DatabaseUsersRepository implements IUsersRepository {

    login(username: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userName: username }).then((value: any) => {
                let isCorrect = new PasswordSecurer().comparePassword(password, new Password(value.password.passwordSalt, value.password.passwordSalt));
                if (isCorrect) {
                    resolve(new User(value._id, value.userType, value.userName, value.firstName, value.lastName, value.birthDate, value.gender, value.city, value.email, value.address, null, null));
                }else {
                    reject('Passwords do not match');
                }
            }).catch((err) => {
                reject('Username not found');
            });
        });
    }

    register(user: User, password: string): Promise<User> {
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
                userType: user.userType.valueOf(),
                address: user.address
            });
            UserModel.insertMany([
                userToInsert
            ], (err, result) => {
                if (err) {
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

    changeUserType(userId: string, usertype: UserType): Promise<User> {
        throw new Error("Method not implemented.");
    }

}