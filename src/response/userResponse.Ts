export  class userResponse {
    user: string;
    _id?: string;
    username: string;
    email: string;
    budget: number;
    remainingAmount: number
    constructor(
        user: string,
        _id: string,
        username: string,

        email: string,
        budget: number,
        remainingAmount: number
    ) {
        this.user = user;
        this._id = _id;
        this.username = username;

        this.email = email;
        this.budget = budget;
        this.remainingAmount = remainingAmount
    }
}