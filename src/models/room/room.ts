import { ROOM_CLEANLINESS, ROOM_STATUS } from "../../constants/enum";
import { Area } from "../area/area";
import { Media } from "../media/media";
import { RoomType } from "../room-type/room-type";

export class Room {
    id: number = 0;
    name: string = "";
    images: Media[] = [];
    description: string = "";
    total_guests: number = 0;
    area:Area = new Area()
    room_type:RoomType = new RoomType()
    status:ROOM_STATUS = ROOM_STATUS.AVAILABLE
    active:boolean = true
    cleanliness:ROOM_CLEANLINESS = ROOM_CLEANLINESS.DIRTY
    select:boolean = false

    
    constructor(data?: Partial<Room>) {
        Object.assign(this, data);
    }
}


