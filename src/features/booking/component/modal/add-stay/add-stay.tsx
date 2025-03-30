import { useEffect, useState } from "react";
import { ReactComponent as IconTable } from "../../assets/icons/ic_table.svg";
import { ReactComponent as IconList } from "../../assets/icons/ic_list.svg";
import { Button, Checkbox, DatePicker, Dropdown, Input, MenuProps, Modal, Select } from "antd";
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { PopupInterface } from "../../../../../constants/popup-interface";
import IconPeople from "../../../../../components/icons/icon-people";
import IconKidFace from "../../../../../components/icons/icon-kid-face";
import AddStayTable, { StayTableProps } from "./table/add-stay-table";
import IconPlus from "../../../../../components/icons/icon-plus";
import IconPlusCircle from "../../../../../components/icons/icon-plus-circle";
import IconCamera from "../../../../../components/icons/icon-camera";
import { AddGuestStayInfor } from "../add-guest-stay-infor/add-guest-stay-infor";
import { PAGE_SIZES } from "../../../../../constants/status";
import { DialogContent } from "../../../../../components/custom/dialog-content";
import IconTrash from "../../../../../components/icons/icon-trash";


export type PickerMode = 'date' | 'week' | 'month';
export type ViewMode = 'list' | 'grid';



const AddStay = () => {
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, title: "", content: undefined });
    const [parameter, setParameter] = useState<StayTableProps>({
        data: data,
        loading: false,
        page: 1,
        limit: PAGE_SIZES[0],
        totalRecords: 0
    })

    const ButtonGroup = ({ quantity, onChange }: { quantity?: number, onChange: ((agr0: number) => void) }) => {
        return (
            <div className="flex items-center gap-3">
                <button className="w-6 h-6 border border-solid-2 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => {

                        let number = quantity ?? 0
                        number -= 1
                        if (number ?? 0 <= 0) {
                            number = 0
                        }
                        onChange(number)
                    }}

                >
                    <span className="text-lg font-normal">-</span>
                </button>
                <span>{quantity ?? 0}</span>
                <button className="w-6 h-6 border border-solid-2 rounded-full flex items-center justify-center text-black hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => {

                        let number = quantity ?? 0
                        number += 1

                        onChange(number)
                    }}
                >
                    <span className="text-lg font-normal">+</span>
                </button>
            </div>
        )
    }

    const showModalAddGuestStayInfor = () => {
        let component = <AddGuestStayInfor />
        setDialog({ ...dialog, open: true, content: component })
    }



    const showModalConfirm = () => {
        let content = <DialogContent 
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash/></p>}
            title="Xoá khách lưu trú?"
            content="Bạn có chắc muốn huỷ thông tin khách lưu trú?"
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
        />
        setDialog({ ...dialog, open: true, content: content })
    }




    return (
        <div >

            <div className="w-full space-y-4">
                <div>
                    <p className="font-bold text-lg">Thêm khách hàng lưu trú</p>
                </div>

                <div className="flex justify-between items-center ">
                    <span className="font-normal text-lg">Số lượng khách</span>
                    <div className="flex gap-5">
                        <div className="flex items-center gap-2 ">
                            <IconPeople />
                            <span>Người lớn</span>
                            <ButtonGroup quantity={7} onChange={(quantity) => console.log(quantity)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <IconKidFace />
                            <span>Trẻ em</span>
                            <ButtonGroup quantity={3} onChange={(quantity) => console.log(quantity)} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="flex justify-between items-center ">
                    <span className="font-normal text-lg">Thông tin chi tiết</span>
                    <div className="flex gap-5">
                        <Button icon={<IconPlusCircle className="w-5 h-5" />}
                            onClick={() => showModalAddGuestStayInfor()}> Thêm khách lưu trú</Button>
                        <Button icon={<IconCamera className="w-5 h-5" />}> Chup CCCD/Hộ chiếu</Button>
                    </div>
                </div>


                <div>
                    <AddStayTable
                        data={parameter.data}
                        loading={parameter.loading}
                        page={parameter.page}
                        limit={parameter.limit}
                        totalRecords={parameter.totalRecords}
                        setPage={(page) => {}}
                        setLimit={(limit) =>{}}
                        onEdit={showModalAddGuestStayInfor}
                        onDelete={(value) => showModalConfirm()}
                    />
                </div>
                <div className="flex justify-between">

                </div>
            </div>

            <Modal
                // className="w-full"
                width={800}
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

export default AddStay;



const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        infor: "Nam/Việt Nam",
        room: 'P.205',
        declarationDate: "09:00, 31/12/2024",
        stayDuration: "09:00, 31/12/2024 - 09:00, 31/12/2024"
    },
    {
        key: '2',
        name: 'Jim Green',
        infor: "Nam/Việt Nam",
        room: 'P.205',
        declarationDate: "09:00, 31/12/2024",
        stayDuration: "09:00, 31/12/2024 - 09:00, 31/12/2024"
    },
    {
        key: '3',
        name: 'Joe Black',
        infor: "Nam/Việt Nam",
        room: 'P.205',
        declarationDate: "09:00, 31/12/2024",
        stayDuration: "09:00, 31/12/2024 - 09:00, 31/12/2024"
    },
];

export interface DataType {
    key: string;
    name: string;
    infor: string;
    room: string;
    declarationDate: string;
    stayDuration: string;
}



