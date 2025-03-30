import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";

import { PAGE_SIZES } from "../../../constants/status";
import { PopupInterface } from "../../../constants/popup-interface";
import { tab_filter_id } from "../../../constants/tag-id";
import { Button, Input, MenuProps, message, Modal } from "antd";
import { GuestTable } from "./component/customer-table";
import IconPersonPlus from '../../../components/icons/icon-person-plus';
import IconImport from '../../../components/icons/icon-import';
import IconExport from '../../../components/icons/icon-export';
import { TabBar } from '../../../components/custom/tab-bar';
import { Guest } from '../../../models/guest/guest';
import { CreateGuest } from './component/create-guest';
import { guestService } from '../../../services/guest/guest-service';
import { DialogContent } from '../../../components/custom/dialog-content';
import IconTrash from '../../../components/icons/icon-trash';
import { GuestDetail } from './component/guest-detail';



export interface GuestListPageProps {
    data: Guest[]
    page: number
    limit: number
    total_record: number
    loading: boolean,
    search_key?: string
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: Guest) => void)
    onChangeStatus?: ((arg0: Guest) => void)
    onShowDetail?: ((arg0: Guest) => void)
}

const GuestListPage = () => {
    const [parameter, setParameter] = useState<GuestListPageProps>({
        data: [],
        loading: false,
        limit: PAGE_SIZES[0],
        page: 1,
        total_record: 1000,
        search_key: "",

    });

    const tabs = [
        { id: 1, label: "Tất cả (40)" },
        { id: 2, label: "Đang sử dụng (30)" },
        { id: 3, label: "Đã đặt trước (30)" },
    ];


    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    // const debounceValue = useDebounce(parameter.search_key ?? "", 800);


    const showModalCreate = (data: Guest) => {
        let component = <CreateGuest
            data={data}
            onComplete={() => {
                getGuest()
                setDialog({ ...dialog, open: false })
            }}
        />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalDetail = (data: Guest) => {
        let component = <GuestDetail data={data}/>
        setDialog({ ...dialog, open: true, content: component,title:"Thông tin khách hàng" })
    }

    const showModalConfirm = (data: Guest) => {
        let content = <DialogContent
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash /></p>}
            title="Xóa khách hàng?"
            content="Khách hàng sẽ bị xóa nhưng giao dịch lịch sữ (nếu có) vẫn sẽ được giữ. Bạn có chắc chắn muốn xóa?"
            btnConfirm={<Button color="danger" variant="solid" onClick={() => deleteGuest(data)}>Xác nhận</Button>}
        />
        setDialog({ ...dialog, open: true, content: content })
    }


    const Header = () => {
        return (
            <div id={tab_filter_id} className='space-y-4'>
                <div className='flex justify-between'>
                    <div className='w-full text-center border-r-2 '>
                        <p className='text-gray-500'>Tổng bán</p>
                        <p className='font-semibold text-xl'>đ130.000.000</p>
                    </div>
                    <div className='w-full text-center border-r-2'>
                        <p className='text-gray-500'>Tổng bán ước tính</p>
                        <p className='font-semibold text-xl text-blue-600'>đ130.000.000</p>
                    </div>
                    <div className='w-full text-center border-r-2'>
                        <p className='text-gray-500'>Tổng đã trả</p>
                        <p className='font-semibold text-xl text-green-600'>đ130.000.000</p>
                    </div>
                    <div className='w-full text-center'>
                        <p className='text-gray-500'>Chưa thanh toán</p>
                        <p className='font-semibold text-xl'>đ130.000.000</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm theo mã, tên, sdt.."
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                            // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                        }}
                    />


                    <div className="flex items-center gap-2">
                        <Button variant="outlined" icon={<IconImport className='w-[20px] h-[20px]' />}>Import</Button>
                        <Button color="blue" variant="outlined" icon={<IconExport className='w-[20px] h-[20px]' />}>Xuất file báo cáo</Button>
                        <Button
                            type="primary"
                            icon={<IconPersonPlus className='text-red-500' />}
                            onClick={() => showModalCreate(new Guest())}
                        >Thêm Khách hàng mới</Button>
                    </div>
                </div>
                <div>
                    <TabBar tabs={tabs}/>
                </div>

            </div>
        )
    };



    const getGuest = () => {
        guestService.List(parameter).then((res) => {

            if (res.status == 200) {
                console.log(res.data.list)
                setParameter({
                    ...parameter,
                    data: res.data.list,
                    total_record: res.data.total_record
                })
            } else {
                message.error(res.message)
            }
        })
    }


    const deleteGuest = (guest:Guest) => {
        guestService.Delete(guest).then((res) => {

            if (res.status == 200) {
                getGuest()
                setDialog({ ...dialog, open:false })
            } else {
                message.error(res.message)
            }
        })
    }


    useEffect(() => {
        getGuest()
    }, [])



    return (
        <div className="space-y-4">

            <div className="panel space-y-6">
                <Header />

                <GuestTable
                    data={parameter.data}
                    page={parameter.page}
                    limit={parameter.limit}
                    total_record={parameter.total_record}
                    loading={parameter.loading}
                    onPageChange={(page) => {
                        setParameter({ ...parameter, page });
                    }}
                    onEdit={(value) => showModalCreate(value)}
                    onChangeStatus={(value) => showModalConfirm(value)}
                    onShowDetail={(value) => showModalDetail(value)}
                />
            </div>

            <Modal
                title={dialog.title}
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
                width={800}
            >
                {dialog.content ?? <></>}
            </Modal>
        </div>
    );
}

export default GuestListPage;



