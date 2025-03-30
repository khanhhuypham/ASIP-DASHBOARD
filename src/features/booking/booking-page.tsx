import { useEffect, useState } from "react";
import { ReactComponent as IconTable } from "../../assets/icons/ic_table.svg";
import { ReactComponent as IconList } from "../../assets/icons/ic_list.svg";
import { Button, Checkbox, DatePicker, Dropdown, Input, MenuProps, Modal, Select } from "antd";
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getAllDaysOfMonth, getTodayHours, getWeekdays } from "../../utils/time-utils";
import { Scheduler } from "./component/scheduler/scheduler";
import { Floor } from "../../models/booking/booking";
import { BookingTable } from "./component/table/booking-table";
import { PopupInterface } from "../../constants/popup-interface";
import { BlockTime } from "../../models/block-time/block-time";
import { RoomReservationModal } from "./component/modal/room-reservation/room-reservation";
import IconCalendarPlus from "../../components/icons/icon-calendar-plus";
import { DialogContent } from "../../components/custom/dialog-content";
import IconTrash from "../../components/icons/icon-trash";

export type PickerMode = 'date' | 'week' | 'month';
export type ViewMode = 'list' | 'grid';

const BookingPage = () => {
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, title: "", content: undefined });

    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [pickerMode, setPickerMode] = useState<PickerMode>("date");
    const [blockTime, setBlockTime] = useState<BlockTime[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        resetDateRange(selectedDate)
    }, [pickerMode])

    const resetDateRange = (date: Date) => {
        let blockTime: BlockTime[] = []
        switch (pickerMode) {
            case "date":

                getTodayHours(date).forEach((value, index) => {

                    let currentDate = new Date()
                    let innerBlock:number[] = []
                   
                    if ((value.getDate() == currentDate.getDate()) && value.getHours() == currentDate.getHours()){
                        innerBlock =  Array.from({ length: 60 }, (_, index) => index + 1)
                    }

                    blockTime.push(new BlockTime({
                        date: value,
                        innerBlock: innerBlock
                    }))
                })

                break;

            case "week":
        
                getWeekdays(date).forEach((value, index) => {
                    let currentDate = new Date()
                    let innerBlock:number[] = []
                   
                    if ((value.getDate() == currentDate.getDate()) && value.getHours() == currentDate.getHours()){
                        innerBlock =  Array.from({ length: 24 }, (_, index) => index + 1)
                    }

                    blockTime.push(new BlockTime({
                        date: value,
                        innerBlock: innerBlock
                    }))
                })
                break

            case "month":
    
                getAllDaysOfMonth(date).forEach((value, index) => {
                    let currentDate = new Date()
                    let innerBlock:number[] = []
   
                    if (value.getDate() == currentDate.getDate()){
                        innerBlock =  Array.from({ length: 24 }, (_, index) => index + 1)
                    }
                
                    blockTime.push(new BlockTime({
                        date: value,
                        innerBlock: innerBlock
                    }))
                })
                break

        }

        console.log(blockTime)

        setBlockTime(blockTime)
    }

    const [data, setData] = useState<Floor[]>([
        {
            name: "Double",
            isExpand: true,
            rooms: [
                {
                    name: "P.101",
                    clean: true,
                    bookings: [
                        {
                            customerName: "Phạm Khánh huy",
                            bgColor: "#F2EBFD",
                            borderColor: "#7440F4",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 5,
                            colspanTo: 5,

                        },
                    ]
                },
                {
                    name: "P.102", clean: true, bookings: [
                        {
                            customerName: "Châu Huỳnh Hồng Phúc",
                            bgColor: "#F1F0F5",
                            borderColor: "#787A93",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 0,
                            colspanTo: 0,

                        },
                        {
                            customerName: "Diệp Đương phát",
                            bgColor: "#FFF9E6",
                            borderColor: "#FFC800",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 3,
                            colspanTo: 4,

                        },
                        {
                            customerName: "Diệp Đương phát",
                            bgColor: "#F2EBFD",
                            borderColor: "#7440F4",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 6,
                            colspanTo: 6,

                        },
                    ]
                },
                {
                    name: "P.103", clean: false, bookings: [

                        {
                            customerName: "Châu Huỳnh Hồng Phúc",
                            bgColor: "#F1F0F5",
                            borderColor: "#787A93",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 0,
                            colspanTo: 0,

                        },
                        {
                            customerName: "Diệp Đương phát",
                            bgColor: "#E9F9EF",
                            borderColor: "#2BC86D",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 1,
                            colspanTo: 3,
                        },
                        {
                            customerName: "Diệp Đương phát",
                            bgColor: "#FFF9E6",
                            borderColor: "#FFC800",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 4,
                            colspanTo: 4,
                        },
                        {
                            customerName: "Diệp Đương phát",
                            bgColor: "#F2EBFD",
                            borderColor: "#7440F4",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 6,
                            colspanTo: 6,

                        },
                    ]
                },

                {
                    name: "P.104", clean: false, bookings: [

                        {
                            customerName: "Diệp Đương phát",
                            bgColor: "#F2EBFD",
                            borderColor: "#7440F4",
                            start: "08:00",
                            end: "08:30",
                            colspanFrom: 6,
                            colspanTo: 6,

                        },
                    ]
                },

                {
                    name: "P.105", clean: false, bookings: [

                        {
                            customerName: "Nguyễn Nhật Đăng Khoa",
                            bgColor: "#E9F9EF",
                            borderColor: "#2BC86D",
                            start: "12:00",
                            end: "20:30",
                            colspanFrom: 3,
                            colspanTo: 4,
                        },

                        {
                            customerName: "Vương Gia Hoà",
                            bgColor: "#F2EBFD",
                            borderColor: "#7440F4",
                            start: "09:00",
                            end: "10:30",
                            colspanFrom: 6,
                            colspanTo: 6,

                        },
                    ]
                }
            ]
        },

        {
            name: "Special",
            isExpand: true,
            rooms: [
                { name: "P.201", clean: true, bookings: [] },
                { name: "P.202", clean: true, bookings: [] },
                { name: "P.203", clean: false, bookings: [] }
            ]
        }
    ])




    const Header = () => {
        return (
            <>

                <div className="flex justify-between">
                    <div>
                        <Button className="rounded-r-none" onClick={() => setViewMode("list")}>
                            <div className="flex items-center gap-2" >
                                <IconTable />
                                <span>Danh sách</span>
                            </div>
                        </Button>
                        <Button className="rounded-l-none" onClick={() => setViewMode("grid")}>
                            <div className="flex items-center gap-1">
                                <IconList />
                                <span>Lưới</span>
                            </div>
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2">

                        <Select
                            value={pickerMode}
                            style={{ width: 100 }}
                            onChange={(value) => {
                                setPickerMode(value as PickerMode)
                            }}
                            options={[
                                {
                                    value: 'date',
                                    label: 'Ngày',
                                },
                                {
                                    value: 'week',
                                    label: 'Tuần',
                                },
                                {
                                    value: 'month',
                                    label: 'Tháng',
                                },

                            ]}
                        />


                        <DatePicker onChange={(date, dateString) => {

                            setSelectedDate(date.toDate())

                            resetDateRange(date.toDate())

                        }}
                            picker={pickerMode}
                            format="DD/MM/YYYY"
                            defaultValue={dayjs(selectedDate ?? new Date())}
                        />


                        <Button
                            type="primary"
                            icon={<IconCalendarPlus className="w-[20px] h-[20px]"/>}
                            onClick={() => showModalCreate()}
                        >Đặt phòng</Button>
                    </div>

                </div>


            </>
        )
    };

    const showModalCreate = () => {

        let component = <RoomReservationModal />

        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalConfirm = () => {
        let content = <DialogContent 
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash/></p>}
            title="Từ chối đặt phòng DP000..?"
            content={
                <div>
                    <p>Bạn có chắc chắn muốn từ chối đặt phòng này?</p>
                    <Input placeholder="Nhập lý do huỷ"/>
                </div>
            }
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
        />
        setDialog({ ...dialog, open: true, content: content })
    }




    return (
        <div className="panel space-y-4">
            <Header />
            {
                viewMode == "grid"
                ? <Scheduler dateRange={blockTime} dateType={pickerMode} data={data} />
                : <BookingTable data={data}  onChangeStatus={showModalConfirm}/>
            }

            <Modal
                // className="w-full"
                width={1200}
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
            >
                {dialog.content ?? <></>}
            </Modal>

        </div>
    )


}

export default BookingPage;





const items: MenuProps['items'] = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: '4rd menu item',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
];



