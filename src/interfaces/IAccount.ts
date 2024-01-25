export default interface Account {
    name: string;
    accountType: "card" | "cash" | "savings" | "custom";
    initialAmount?: number
}