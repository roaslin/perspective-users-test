export default class UserModel {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly creationDate: Date;

    constructor(id: string, name: string, email: string, creationDate: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.creationDate = creationDate;
    }
}
