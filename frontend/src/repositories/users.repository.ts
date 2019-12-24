import { IUsersRepository } from "../../../shared/repository-base/users.repository";

export class WebUsersRepository implements IUsersRepository {
    approveUser(user: import("../../../shared/domain/user.model").User): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }    
    
    removeUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    changeUserType(userId: string, usertype: import("../../../shared/domain/user.model").UserType): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }
    
    editData(user: import("../../../shared/domain/user.model").User): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }
    
    getUnapprovedUsers(): Promise<import("../../../shared/domain/user.model").User[]> {
        throw new Error("Method not implemented.");
    }
    
    login(username: string, password: string): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }
    
    register(user: import("../../../shared/domain/user.model").User, password: string): Promise<import("../../../shared/domain/user.model").User> {
        throw new Error("Method not implemented.");
    }

    
}