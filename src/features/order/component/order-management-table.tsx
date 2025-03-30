import { Avatar, Button, Pagination, PaginationProps, Table, TableProps, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Order } from "../../../models/order/order";
import { OrderListProps } from "../order-management";
import { tab_filter_id, tab_menu_id } from "../../../constants/tag-id";



export const OrderManagementTable = ({
    data,
    page,
    limit,
    total_record,
    loading,
    onPageChange,
    onEdit,
    onChangeStatus,
    onShowDetail
}: OrderListProps) => {
    const [tableMaxHeight, setTableMaxHeight] = useState(0);

    useEffect(() => {

        const handleResize = () => {
            let remainingHeight = window.innerHeight - (24 + 24 + 20 + 20 + 12) 
            const header = document.querySelector(".navbar") as HTMLElement;
            const tab = document.getElementById(tab_menu_id) as HTMLElement;
            const filter = document.getElementById(tab_filter_id) as HTMLElement;

           
            if (header) {
                remainingHeight -= header.offsetHeight
            }
            if (tab) {
                remainingHeight -= tab.offsetHeight
            }
            if (filter) {
                remainingHeight -= filter.offsetHeight
            }

            setTableMaxHeight(remainingHeight);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const columns: ColumnsType<Order> = [
        {
            title: 'Mã đặt phòng',
            dataIndex: '',
            key: '',
            render: (record, _, index) => {
                return (
                    <div className="space-y-2">
                        <p className="text-blue-700 font-medium">DP000566: {(page - 1) * limit + (index + 1)}</p>
                        <p className="text-gray-500"> 08:44 - 27/12/2024</p>
                    </div>
                )
            },
        },


        {
            title: 'Phòng đặt',
            dataIndex: '',
            key: '',
            render: (record, _, index) => {
                return (
                    <div className="space-y-1">
                        <p>1 Studio Classic Home</p>
                        <p className="text-gray-500">The Aston Vill Hotel</p>
                    </div>
                )
            },
        },

        {
            title: 'Tên khách hàng',
            dataIndex: '',
            key: '',
            render: (record, _, index) => {
                return (
                    <div className="flex items-center gap-2">
                        <Avatar size={40} icon={<UserOutlined />} />
                        <div className="space-y-1">
                            <p>Nguyễn Văn A</p>
                            <p className="text-gray-500">1 người lớn, 0 trẻ em</p>
                        </div>

                    </div>
                )
            },
        },

        {
            title: 'Checkin',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span>14:00 - 29/12/2024</span>,

        },

        {
            title: 'Checkout',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span>09:44 - 31/12/2024</span>,
        },

        {
            title: 'Nguồn',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" alt="Airbnb Logo" width="80" />,
        },

        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (i, row) => (

                <div className="">

                    <Button onClick={() => {

                    }} type="text">
                        <i className="fa-solid fa-eye"></i>
                    </Button>

                    <Button onClick={() => { onEdit && onEdit(row) }} type="text">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>

                    <Button type="text" danger onClick={() => { onChangeStatus && onChangeStatus(row) }}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>

                </div>
            )
        },

    ];
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

    return <Table<Order>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={false}
        loading={loading}
        footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} showTotal={showTotal} />}
        expandable={{
            showExpandColumn: false,
        }}
        style={{ height: tableMaxHeight}}
        scroll={{
            x: 1500,
            y: tableMaxHeight - 100 // minus footer height
        }}
    />

}

