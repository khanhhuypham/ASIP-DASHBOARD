import { ROOM_TYPE_STATUS } from "../../constants/enum";
import { Media } from "../media/media";
import { Room } from "../room/room";

export class RoomType {
    id: number = 0;
    images: Media[] = [];
    code: string = "";
    name: string = "";
    price: number = 0;
    quantity: number = 0;
    description: string = ""
    room: Room[] = []
    status: ROOM_TYPE_STATUS = ROOM_TYPE_STATUS.ACTIVE
   

    constructor(data?: Partial<RoomType>) {
        Object.assign(this, data);
    }
}


