import { Room } from "../room/room";

export class Area {
    id: number = 0;
    name: string = "";
    description: string = "";
    rooms:Room[] = []
   

    constructor(data?: Partial<Area>) {
        Object.assign(this, data);
    }
}


