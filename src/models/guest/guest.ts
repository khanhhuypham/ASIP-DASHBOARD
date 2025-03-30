import { GENDER, GUEST_TYPE } from "../../constants/enum";
import { Media } from "../media/media";
import { GuestGroup } from "./guest-group";

export class Guest {
    id: number = 0;
    code: string = "";
    taxCode: string = "";
    name: string = "";
    avatar: Media = new Media();
    email?: string;
    phone: string = "";
    DOB: string = "";
    gender: GENDER = GENDER.MALE;
    nationality: string = "";
    companyName: string = "";
    guest_type: GUEST_TYPE = GUEST_TYPE.INDIVIDUAL;
    guest_group: GuestGroup = new GuestGroup();
    description: string = "";

    constructor(data?: Partial<Guest>) {
        Object.assign(this, data);
    }
}
