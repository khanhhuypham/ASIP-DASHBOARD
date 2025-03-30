import { User } from "../user";

export class Order {
    id: number = 0;
    // user:User = new User()

    constructor(data?: Partial<Order>) {
        Object.assign(this, data);
    }
}


