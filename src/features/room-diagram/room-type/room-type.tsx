import { RoomTypeTable } from "./component/room-type-table";
import { Button, Input, Layout, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { PAGE_SIZES } from "../../../constants/status";
import { PopupInterface } from "../../../constants/popup-interface";
import { tab_filter_id } from "../../../constants/tag-id";

import { RoomTypeDetail } from "./component/room-type-detail/room-type-detail";
import IconTrash from "../../../components/icons/icon-trash";
import { DialogContent } from "../../../components/custom/dialog-content";

import { roomTypeService } from "../../../services/room-type/room-type-service";
import { RoomType } from "../../../models/room-type/room-type";
import { AddRoomType } from "./component/add-room-type";

import { removeVietnameseFromString } from "../../../utils/helpers";
import { ROOM_TYPE_STATUS } from "../../../constants/enum";



export interface RoomTypeListProps {
    data: RoomType[]
    loading: boolean,
    search_key?: string
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: RoomType) => void)
    onChangeStatus?: ((arg0: RoomType) => void)
    onShowDetail?: ((arg0: RoomType) => void)
}



const RoomTypePage = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const [data, setData] = useState<RoomType[]>([])
    const [fullData, setFullData] = useState<RoomType[]>([])
    const [status, setStatus] = useState<ROOM_TYPE_STATUS>(ROOM_TYPE_STATUS.ACTIVE)
  

    const getRoomtType = () => {
        roomTypeService.List().then((res) => {
            if (res.status == 200) {
                // setParameter({ ...parameter, data: res.data });
                setData(res.data.filter((item) => item.status == status))
                setFullData(res.data)
            } else {
                message.error(res.message)
            }
        })
    }

    const deleteRoomtType = (data: RoomType) => {
        roomTypeService.Delete(data).then((res) => {
            if (res.status == 200) {
                getRoomtType()
            } else {
                message.error(res.message)
            }
        })
    }

    useEffect(() => {
        getRoomtType()
    }, []);


    const showModalCreate = (data: RoomType) => {
        let component = <AddRoomType data={data} onComplete={() => {
            getRoomtType()
            setDialog({ ...dialog, open: false })
        }} />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showDetailModal = (data: RoomType) => {
        let component = <RoomTypeDetail input={data} />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalConfirm = (data: RoomType) => {
        let content = <DialogContent
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash /></p>}
            title="Xóa hạng phòng?"
            content={data.name}
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
            onConfirm={() => deleteRoomtType(data)}
        />
        setDialog({ ...dialog, open: true, content: content })
    }


    const onSearch = (key: string) => {
        let keySearch = key.toLowerCase();
        const filteredData = fullData.filter((item) => item.status == status);

        const data = keySearch
        ? filteredData.filter((item) => {
            let name = item.name.toLowerCase();
            if (!removeVietnameseFromString(keySearch)) {
                name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                keySearch = keySearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            }
            return name.includes(keySearch);
        })
        : filteredData;


        setData(data);

    };

    const Header = ({ setStatus, status }:{ setStatus:((value:ROOM_TYPE_STATUS)=>void), status:ROOM_TYPE_STATUS}) => {
        return (
            <div id={tab_filter_id}>
                <div className="flex justify-between">
                    <span className="text-lg font-semibold">Hạng phòng ({data.length})</span>
                    <Button type="primary" onClick={() => showModalCreate(new RoomType())}>+ Thêm hạng phòng</Button>
                </div>
                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm hạng phòng"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <div className="flex justify-between gap-3">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="form-checkbox rounded-[3px] h-4 w-4 border-purple-600"
                                checked={status === ROOM_TYPE_STATUS.ACTIVE}
                                onChange={(e) => {
                                    setStatus(ROOM_TYPE_STATUS.ACTIVE)
                                    setData(fullData.filter((item) => item.status == ROOM_TYPE_STATUS.ACTIVE))
                                }}
                            />
                            <span className="text-sm">Đang kinh doanh(11)</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="form-checkbox rounded-[3px] h-4 w-4 border-cyan-200"
                                checked={status === ROOM_TYPE_STATUS.INACTIVE}
                                onChange={(e) => {
                                    setStatus(ROOM_TYPE_STATUS.INACTIVE)
                                    setData(fullData.filter((item) => item.status == ROOM_TYPE_STATUS.INACTIVE))
                                }}
                            />
                            <span className="text-sm">Ngừng kinh doanh(11)</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    };



    return (
        <div className="panel space-y-6">

            <Header setStatus={setStatus} status={status} />

            <RoomTypeTable
                data={data}
                loading={false}
                onEdit={(value) => showModalCreate(value)}
                onChangeStatus={(value) => showModalConfirm(value)}
                onShowDetail={(value) => showDetailModal(value)}
            />

            <Modal
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
            >
                {dialog.content ?? <></>}
            </Modal>
        </div>
    );

}


export default RoomTypePage;
