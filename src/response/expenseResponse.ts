export class expense {
    _id: string;
    amount: number;
    purpose: string;
    user: string;
    status: string

    constructor
    (
        _id: string,
        amount: number,
        purpose: string,
        user: string,
        status: string
    ) {
        this._id = _id;
        this.amount = amount;
        this.purpose = purpose;
        this.user = user;
        this.status = status
    }
}