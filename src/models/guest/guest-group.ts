import { Guest } from "./guest";

export class GuestGroup {
    id: number = 0;
    name: string = "";
    description: string = "";
    guests:Guest[] = []
    
    constructor(data?: Partial<GuestGroup>) {
        Object.assign(this, data);
    }
}

