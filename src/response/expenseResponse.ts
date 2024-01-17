export class expense {
    amount: number;
    purpose: string;
    user: string;
    status: string;
    date: number

    constructor
        (
            _id: string,
            amount: number,
            purpose: string,
            user: string,
            status: string,
            date: number
        ) {
        this.amount = amount;
        this.purpose = purpose;
        this.user = user;
        this.status = status
        this.date = date
    }
}
