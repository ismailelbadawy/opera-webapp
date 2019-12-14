import { model } from 'mongoose';

import { IUsersRepository } from '../../../../shared/repository-base/users.repository';
import { PasswordSecurer, Password } from '../utility/password.generator';

import { User, UserType } from "../../../../shared/domain/user.model";
import { UserSchema } from '../schemas/user.schema';

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
                } else {
                    reject('Passwords do not match');
                }
            }).catch((err) => {
                reject('Username not found');
            });
        });
    }

    register(user: User, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            console.log('Started')
            let passwordObject = (new PasswordSecurer().securePassword(password));
            try {
                var userToInsert = new UserModel({
                    userName: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    city: user.city,
                    passwordHash: passwordObject.passwordHash,
                    passwordSalt: passwordObject.passwordSalt,
                    userType: user.userType.valueOf(),
                    address: user.address
                });
            }catch(e) {
                console.log(e);
            }
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
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(user.userId, 
                {
                    userName: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    birthDate: user.birthDate,
                    city: user.city,
                    userType: user.userType.valueOf(),
                    address: user.address
                },
                async (err, result) => {
                    if(err) {
                        reject(err);
                        return;
                    }
                    let dbUser = new User(
                        result._id,
                        result.get('userType'),
                        result.get('username'),
                        result.get('firstName'),
                        result.get('lastName'),
                        result.get('birthDate'),
                        result.get('gender'),
                        result.get('city'),
                        result.get('email'),
                        result.get('address'),
                        null, 
                        null
                    );
                    resolve(dbUser);
                }
            );
        });
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