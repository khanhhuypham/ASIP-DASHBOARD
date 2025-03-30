import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Order } from "../../../models/order/order";
import { PopupInterface } from "../../../constants/popup-interface";
import { tab_filter_id, } from "../../../constants/tag-id";
import { Button, Card, Input, MenuProps, message, Modal } from "antd";
import { GuestGroupTable } from './component/guest-group-table';
import { GuestGroup } from '../../../models/guest/guest-group';
import { CreateGuestGroup } from './component/guest-group-create';
import { DialogContent } from '../../../components/custom/dialog-content';
import IconTrash from '../../../components/icons/icon-trash';
import { guestGroupService } from '../../../services/guest/guest-group-service';




export interface GuestGroupListProps {
    data: GuestGroup[],
    loading: boolean,
    search_key?: string
    onEdit?: ((arg0: GuestGroup) => void)
    onChangeStatus?: ((arg0: GuestGroup) => void)
    onShowDetail?: ((arg0: GuestGroup) => void)
}



const GuestGroupPage = () => {
    const [parameter, setParameter] = useState<GuestGroupListProps>({
        data: [],
        loading: false,
        search_key: "",
    });

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });



    const showModalCreate = (data: GuestGroup) => {
        let component = <CreateGuestGroup
            data={data} 
            onComplete={() => {
                getGuestGroup()
                setDialog({ ...dialog, open: false })
            }}
        />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalConfirm = (data: GuestGroup) => {
        let content = <DialogContent
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash /></p>}
            title="Xóa nhóm khách hàng?"
            content={`Bạn có chắc chắn muốn xóa nhóm ${data.name} này?`}
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
        // onConfirm={() => deleteRoomtType(data)}
        />
        setDialog({ ...dialog, open: true, content: content })
    }


    const getGuestGroup = () => {
        guestGroupService.List().then((res) => {
            if (res.status == 200) {
                setParameter({ ...parameter, data: res.data })
            } else {
                message.error(res.message)
            }
        })
    }

    useEffect(() => {
        getGuestGroup()
    },[])




    return (
        <div>

            <div className="panel space-y-6">

                <div id={tab_filter_id}>

                    <div className="flex items-center justify-between gap-2">
                        <p className='font-semibold text-lg'>
                            Nhóm khách hàng(3)
                        </p>

                        <Button type="primary" onClick={() => showModalCreate(new GuestGroup())}><span className='text-bold'>+ Nhóm khách hàng</span></Button>

                    </div>

                    <div className="flex justify-between">
                        <Input
                            placeholder="Tìm kiếm tên nhóm khách hàng"
                            className="w-64"
                            prefix={<i className="fa-solid fa-magnifying-glass" />}
                            allowClear
                            onChange={(e) => {
                                // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                            }}
                        />
                    </div>

                </div>

                <GuestGroupTable
                    data={parameter.data}
                    loading={parameter.loading}
                    onEdit={(value) => showModalCreate(value)}
                    onChangeStatus={(value) => showModalConfirm(value)}
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
        </div>
    );
}

export default GuestGroupPage;

