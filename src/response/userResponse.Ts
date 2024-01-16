export class user {
    user: string;
    _id: string;
    username: string;
    password: string;
    email: string;
    budget: number;
    remainingAmount: number
    constructor(
        user: string,
        _id: string,
        username: string,
        password: string,
        email: string,
        budget: number,
        remainingAmount: number
    ) {
        this.user = user;
        this._id = _id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.budget = budget;
        this.remainingAmount = remainingAmount
    }
}