import { GENDER, GUEST_GROUP_TYPE, GUEST_TYPE } from "../../constants/enum";

export class Guest {
    id: number = 0;
    code: string = "";
    avatar: string = "";
    name: string = "";
    DOB: string = "";
    address: string = "";
    email: string = "";
    phone: string = "";
    note: string = "";
    nationality: string = "";
    taxCode: string = "";
    companyName: string = "";
    guestType: GUEST_TYPE = GUEST_TYPE.INDIVIDUAL;
    guestGroupType: GUEST_GROUP_TYPE = GUEST_GROUP_TYPE.VOLUNTOURISM;
    gender: GENDER = GENDER.MALE;

    constructor(data?: Partial<Guest>) {
        Object.assign(this, data);
    }
}


