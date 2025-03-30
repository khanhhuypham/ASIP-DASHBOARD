export class BlockTime {
    id: number = 0;
    date: Date = new Date();
    innerBlock:number[] = [];
    
    
    constructor(data?: Partial<BlockTime>) {
        Object.assign(this, data);
    }
}


