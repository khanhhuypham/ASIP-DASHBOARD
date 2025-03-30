import { Button, Input, message, Modal } from "antd";
import { RoomAndAssociationTable } from "./component/table/room-and-association-table";
import { useEffect, useState } from "react";
import { PopupInterface } from "../../../constants/popup-interface";
import { tab_filter_id } from "../../../constants/tag-id";
import { PAGE_SIZES } from "../../../constants/status";
import { AddRoom } from "./component/add-room/add-room";
import { RoomAndAssociationDetail } from "./component/detail/room-and-association-detail";
import { DialogContent } from "../../../components/custom/dialog-content";
import IconTrash from "../../../components/icons/icon-trash";
import { roomService } from "../../../services/room/room-service";
import { Room } from "../../../models/room/room";

export interface RoomListProps {
    data: Room[]
    page: number
    limit: number
    total_record: number
    active: boolean
    loading: boolean,
    search_key?: string
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: Room) => void)
    onChangeStatus?: ((arg0: Room) => void)
    onShowDetail?: ((arg0: Room) => void)
}


export const RoomAndAssociation = () => {

    const [parameter, setParameter] = useState<RoomListProps>({
        data: [],
        loading: true,
        limit: PAGE_SIZES[0],
        page: 1,
        total_record: 0,
        search_key: "",
        active: true
    });


    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    // const debounceValue = useDebounce(parameter.search_key ?? "", 800);


    useEffect(() => {
        if (parameter.loading) {
            getRoom(parameter)
        }

    }, [parameter])

    const getRoom = (param: RoomListProps) => {
        roomService.List(param).then((res) => {
  
            if (res.status == 200) {
                setParameter({...param, loading: false,
                    ...(res.status === 200
                        ? {
                            data: res.data.list,
                            limit: res.data.limit,
                            total_record: res.data.total_record,
                        }
                        : {}),
                });
            } else {
                message.error(res.message)
                setParameter({...param, loading: false});
            }
        })

    }

    const showModalCreate = (data: Room) => {
        let component = <AddRoom data={data} onComplete={() => {
            getRoom(parameter)
            setDialog({ ...dialog, open: false })
        }}/>
        setDialog({ ...dialog, open: true, content: component })
    }

    const showDetailModal = (data: Room) => {
        let component = <RoomAndAssociationDetail input={data}/>
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalConfirm = (data: Room) => {
        let content = <DialogContent
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash /></p>}
            title={`Xóa phòng ${data.name}?`}
            content={`Bạn có chắc chắn muốn xóa phòng ${data.name} này?`}
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
        />
        setDialog({ ...dialog, open: true, content: content })
    }

    const Header = () => {
        return (
            <div id={tab_filter_id}>

                <div className="flex justify-between">
                    <span className="text-lg font-semibold">Phòng và kết nói lịch ({parameter.total_record})</span>

                    <Button type="primary" onClick={() => showModalCreate(new Room())}>+ Thêm phòng</Button>
                </div>
                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm phòng"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        value={parameter.search_key}
                        onChange={(e) => {
                            setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "", loading: true });
                        }}
                    />
                   

                    <div className="flex justify-between gap-3">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-purple-600"
                                checked={parameter.active}
                                onChange={(e) => {
                                    setParameter(prevState => ({ ...prevState, page: 1, active: true, loading: true }));

                                }}
                            />
                            <span className="text-sm">Đang kinh doanh(11)</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-cyan-200"
                                checked={!parameter.active}
                                onChange={(e) => {
                                    setParameter(prevState => ({ ...prevState, page: 1, active: false, loading: true }));

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
        <>
            <div className="panel space-y-6">

                <Header />

                <RoomAndAssociationTable
                    data={parameter.data}
                    page={parameter.page}
                    limit={parameter.limit}
                    active={parameter.active}
                    total_record={parameter.total_record}
                    loading={parameter.loading}
                    onPageChange={(page) => {
                        setParameter({ ...parameter, page, loading: true });
                    }}
                    onEdit={(value) => showModalCreate(value)}
                    onChangeStatus={(value) => showModalConfirm(value)}
                    onShowDetail={(value) => showDetailModal(value)}
                />

            </div>

            <Modal
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
            >
                {dialog.content ?? <></>}
            </Modal>
        </>

    );
}