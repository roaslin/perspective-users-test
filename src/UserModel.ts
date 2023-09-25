export default class UserModel {
    id: string;
    name: string;
    email: string;
    creationDate: Date;

    constructor(id: string, name: string, email: string, creationDate: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.creationDate = creationDate;
    }
}
