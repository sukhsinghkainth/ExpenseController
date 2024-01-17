export class settlement {
 
    amount: number;
    data: number;
    user: string;
    status: string
    constructor
        (
        
            amount: number,
            data: number,
            user: string,
            status: string
        ) {
    
        this.amount = amount;
        this.data = data;
        this.status = status;
        this.user = user
    }
}