export interface Floor {
    name: string,
    isExpand: boolean
    rooms: Room[]
}

export interface Room {
    name: string,
    clean: boolean
    bookings: Booking[]
}

export interface Booking {
    customerName: string,
    bgColor: string,
    borderColor: string,
    colspanFrom: number,
    colspanTo: number,
    start: string,
    end: string
}
