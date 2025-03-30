
export class Price {
    id: number = 0;
    name: string = "";
    code: string = "";
    valid_from: string = "";
    valid_to: string = "";
    note: string = "";
    price:number = 0;
    select: boolean = false;
    
    
    
    constructor(data?: Partial<Price>) {
        Object.assign(this, data);
    }
}


