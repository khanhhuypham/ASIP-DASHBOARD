import { Button, Dropdown, Input, Modal } from "antd";
import { useState } from "react";

import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import IconAirbnb from "../../../../../assets/images/airbnb-circle-image.png";
import IconTraveloka from "../../../../../assets/images/traveloka-circle-image.png";
import IconBookingDotCom from "../../../../../assets/images/booking.com-circle-image.png";
import IconAgoda from "../../../../../assets/images/agoda-circle-image.png";
import { PopupInterface } from "../../../../../constants/popup-interface";
import { AddRoom } from "../add-room/add-room";
import AddStay from "../add-stay/add-stay";
import { AddGuest } from "../add-guest/add-guest";
import IconPeople from "../../../../../components/icons/icon-people";
import IconPersonPlus from "../../../../../components/icons/icon-person-plus";
import IconKidFace from "../../../../../components/icons/icon-kid-face";
import IconIdCard from "../../../../../components/icons/icon-id-card";
import IconCaretDownFill from "../../../../../components/icons/icon-caret-down-fill";
import IconTag from "../../../../../components/icons/icon-tag";
import { RoomReservationTable, RoomReservationTableProps } from "./table/room-reservation-table";
import { PAGE_SIZES } from "../../../../../constants/status";
import { ROOM_TYPE } from "../../../../../constants/enum";



export interface Reservation {
    id: number;
    room_type: ROOM_TYPE;
    room: string;
    checkin: string;
    checkout: string;
    scheduled_date: number;
    price: number;
    children?: Reservation[];
    header:boolean;
}





export const RoomReservationModal = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, title: "", content: undefined });
    const [parameter, setParameter] = useState<RoomReservationTableProps>({
        data: data,
        loading: false,
        page: 1,
        limit: PAGE_SIZES[0],
        totalRecords: 0
    })


    const showModalAddRoom = () => {
        let component = <AddRoom />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalCreate = () => {
        let component = <AddStay />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalAddGuest = () => {
        let component = <AddGuest />
        setDialog({ ...dialog, open: true, content: component })
    }



    return (
        <>
            <div className="w-full">
                <div>
                    <p className="font-bold text-lg">Thêm mới đặt/nhận phòng</p>
                    <p className="text-gray-500">Hãy chọn phòng hoặc nhiều phòng để thực hiện đặt/nhận phòng</p>
                </div>
                <div>
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Tìm kiếm"
                                className="w-64"
                                prefix={<i className="fa-solid fa-magnifying-glass" />}
                                suffix={<div onClick={showModalAddGuest}><IconPersonPlus /></div>}
                                allowClear
                                onChange={(e) => {
                                    // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                                }}
                            />
                            <div className="text-center">
                                <Button className="rounded-none rounded-l-lg " icon={<IconPeople />} onClick={() => showModalCreate()}>01</Button>


                                <Button className="rounded-none" icon={<IconKidFace />} onClick={() => showModalCreate()}>0</Button>


                                <Button className="rounded-none rounded-r-lg" icon={<IconIdCard />} onClick={() => showModalCreate()}>0</Button>

                            </div>

                        </div>


                        <div className="space-x-4 flex items-end">

                            <Dropdown menu={{ items: CustomerMenu }} trigger={['click']} >
                                <Button className="flex items-center gap-2">
                                    <UserOutlined />
                                    <span>Khách đến trực tiếp</span>
                                    <IconCaretDownFill />
                                </Button>
                            </Dropdown>


                            <Dropdown menu={{ items: PriceMenu }} trigger={['click']}>
                                <Button className="flex items-center gap-2">
                                    <IconTag />
                                    <span>Bảng giá</span>
                                    <IconCaretDownFill />
                                </Button>
                            </Dropdown>

                        </div>
                    </div>

                </div>
                <div>

                    <RoomReservationTable
                        data={parameter.data}
                        loading={parameter.loading}
                        page={parameter.page}
                        limit={parameter.limit}
                        totalRecords={parameter.totalRecords}
                        setPage={(page) => { }}
                        setLimit={(limit) => { }}
                        onEdit={(value) => { }}
                        onDelete={(value) => { }}
                    />

                </div>
                <div className="flex justify-between">
                    <Button
                        color="blue" variant="outlined"
                        icon={<i className="fa-solid fa-folder-plus"></i>}
                        onClick={showModalAddRoom}
                    >Chọn thêm phòng</Button>

                    <div className="rounded-lg bg-gray-100 p-2 w-64 border-[1px] border-gray-200">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Tổng tiền hàng</span>
                            <span className="font-semibold">đ8.250.000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Khách thanh toán</span>
                            <span className="font-semibold">đ8.250.000</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Giảm giá</span>
                            <span className="font-semibold text-red-600">0</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Còn lại</span>
                            <span className="font-semibold text-blue-600">0</span>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end gap-3">
                    <Button color="blue" variant="outlined">Đặt phòng</Button>
                    <Button type="primary">Nhận phòng</Button>
                </div>
            </div>

            <Modal
                className="w-full"
                width={1000}
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
            >
                {dialog.content ?? <></>}
            </Modal>
        </>
    );
};



const data: Reservation[] = [


    {
        id: 1,
        room_type: ROOM_TYPE.DOUBLE_ROOM,
        room: "P.101",
        checkin: "14:00-29/12/2024",
        checkout: "14:00-31/12/2024",
        scheduled_date: 2,
        price: 2222,
        header:true
    },

    {
        id: 2,
        room_type: ROOM_TYPE.TRIPPLE_ROOM,
        room: "P.200",
        checkin: "14:00-29/12/2024",
        checkout: "14:00-31/12/2024",
        scheduled_date: 2,
        price: 2222,
        children: [
            {
                id: 3,
                room_type: ROOM_TYPE.TRIPPLE_ROOM,
                room: "P.201",
                checkin: "14:00-29/12/2024",
                checkout: "14:00-31/12/2024",
                scheduled_date: 2,
                price: 2222,
                header:false
            },
            {
                id: 4,
                room_type: ROOM_TYPE.TRIPPLE_ROOM,
                room: "P.202",
                checkin: "14:00-29/12/2024",
                checkout: "14:00-31/12/2024",
                scheduled_date: 2,
                price: 2222,
                header:false
            },
            {
                id: 5,
                room_type: ROOM_TYPE.TRIPPLE_ROOM,
                room: "P.203",
                checkin: "14:00-29/12/2024",
                checkout: "14:00-31/12/2024",
                scheduled_date: 2,
                price: 2222,
                header:false
            }
        ],
        header:true
    }

];



const CustomerMenu: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div>
                Khách trực tiếp
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div className="flex items-center justify-start gap-2">
                <img width={25} height={25} src={IconAirbnb} />
                <span>Airbnb</span>
            </div>
        ),

    },
    {
        key: '3',
        label: (
            <div className="flex items-center justify-start gap-2">
                <img width={25} height={25} src={IconTraveloka} />
                <span>Traveloka</span>
            </div>
        ),

    },
    {
        key: '4',
        label: (
            <div className="flex items-center justify-start gap-2">
                <img width={25} height={25} src={IconBookingDotCom} />
                <span>Booking.com</span>
            </div>
        ),
    },

    {
        key: '5',
        label: (
            <div className="flex items-center justify-start gap-2">
                <img width={25} height={25} src={IconAgoda} />
                <span>Agoda</span>
            </div>
        ),
    },
];




const PriceMenu: MenuProps['items'] = [
    {
        key: '1',
        label: <span>Mặc định</span>,
    },
    {
        key: '2',
        label: <span>Giá khách VIP</span>,

    },
    {
        key: '3',
        label: <span>Giá khách thường</span>,
    },
    {
        key: '4',
        label: <span>Giá 02/09</span>,
    },
    {
        key: '5',
        label: <span>Giá cuối tuần</span>,
    },
];
