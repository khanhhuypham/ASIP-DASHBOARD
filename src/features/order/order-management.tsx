import { useEffect, useState } from "react";

import { Button, DatePicker, Dropdown, Input, MenuProps, Modal } from "antd";

import { OrderManagementTable } from "./component/order-management-table";
import { Order } from "../../models/order/order";
import { PAGE_SIZES } from "../../constants/status";
import { PopupInterface } from "../../constants/popup-interface";
import { UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import { tab_filter_id } from "../../constants/tag-id";

export interface OrderListProps {
    data: Order[]
    page: number
    limit: number
    total_record: number
    loading: boolean,
    search_key?: string
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: Order) => void)
    onChangeStatus?: ((arg0: Order) => void)
    onShowDetail?: ((arg0: Order) => void)
}


export const OrderManagement = () => {

    const [parameter, setParameter] = useState<OrderListProps>({
        data: [
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order()
        ],
        loading: false,
        limit: PAGE_SIZES[0],
        page: 1,
        total_record: 1000,
        search_key: "",

    });

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    // const debounceValue = useDebounce(parameter.search_key ?? "", 800);


    const showModalCreate = (data: Order) => {
        let component = <p>Are you sure you want to remove this item</p>
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalConfirm = (data: Order) => {
        let content = <p>Are you sure you want to remove this item</p>
        setDialog({ ...dialog, open: true, content: content })
    }

    const Header = () => {
        return (
            <div id={tab_filter_id}>
                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                            // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                        }}
                    />

                    <div className="text-center">
                        <Button className="rounded-none rounded-l-lg">
                            <div className="space-x-1">
                                <i className="fa-solid fa-arrow-up-wide-short"></i>
                                <span>Bộ lộc</span>
                            </div>
                        </Button>

                        <DatePicker className="rounded-none" defaultValue={dayjs('01/01/2025', 'DD/MM/YYYY')} format={'DD/MM/YYYY'} />


                        <Dropdown menu={{ items }} >
                            <Button className="rounded-none">
                                <div className="space-x-1">
                                    <span>Phòng đặt</span>
                                    <i className="fa-solid fa-caret-down"></i>
                                </div>
                            </Button>
                        </Dropdown>

                        <Dropdown menu={{ items }}>
                            <Button className="rounded-none">
                                <div className="space-x-1">
                                    <span>Nguồn</span>
                                    <i className="fa-solid fa-caret-down"></i>
                                </div>
                            </Button>
                        </Dropdown>
                        <Button className="rounded-none rounded-r-lg">
                            <div className="space-x-1 text-red-600">
                                <i className="fa-solid fa-clock"></i>
                                <span> Đặt lại bộ lọc </span>
                            </div>
                        </Button>

                    </div>

                </div>

            </div>
        )
    };



    return (
        <div className="panel space-y-6">

            <Header />

            <OrderManagementTable
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
            />

            <Modal
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
};


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