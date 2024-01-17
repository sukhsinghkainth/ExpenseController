export class settlement {
    _id: Number;
    amount: number;
    data: number;
    user: string;
    status: string
    constructor
        (
            _id: Number,
            amount: number,
            data: number,
            user: string,
            status: string
        ) {
        this._id = _id;
        this.amount = amount;
        this.data = data;
        this.status = status;
        this.user = user


    }
}