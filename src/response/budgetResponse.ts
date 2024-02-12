import category, { categoryType } from "../interfaces/ICategory";

export class BudgetResponse {
    category: {
      name: string;
      type: categoryType;
    };
    limit: number;
    spent: number;
    remaininglimit: number;
  
    constructor(
        category : {
            name : string,
            type : categoryType
        },
        limit : number,
        spent : number,
        remaininglimit : number
    ) {
      this.category = {
        name: category.name,
        type: category.type,
      };
      this.limit = limit;
      this.spent = spent;
      this.remaininglimit = remaininglimit;
    }
  }