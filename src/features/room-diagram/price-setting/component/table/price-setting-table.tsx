import { Avatar, Button, Dropdown, Input, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { tab_filter_id, tab_menu_id } from "../../../../../constants/tag-id";
import { OrderListProps } from "../../../../order/order-management";
import { Order } from "../../../../../models/order/order";
import IconThreedots from "../../../../../components/icons/icon-three-dots";
import IconTrash from "../../../../../components/icons/icon-trash";
import IconLocation from "../../../../../components/icons/icon-location";
import IconPeople from "../../../../../components/icons/icon-people";
import IconCalendar from "../../../../../components/icons/icon-calendar";
import { Price } from "../../../../../models/price/price";


export const PriceSettingTable = ({
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


    const handleMenuClick: MenuProps['onClick'] = (e) => {
        // const { key } = e;
        switch (e.key) {
            case '0':
                // Call the onEdit function passed as a prop
                break;
            case '1':
                onShowDetail && onShowDetail(new Order())// Call the onShowDetail function passed as a prop
                break;
            case '3':
                // Handle delete action
                console.log("Delete action triggered");
                break;
            default:
                break;
        }
    };

    const columns: ColumnsType<Order> = [

        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (record, _, index) => (page - 1) * limit + (index + 1),
            width: 60
        },

        {
            title: 'Tên phòng',
            dataIndex: '',
            key: '',
            render: (record, _, index) => {
                return (
                    <div className="flex items-center gap-2">
                        <Avatar size={40} shape="square" icon={<UserOutlined />} />
                        <div>
                            <p className="font-medium">The Aston villa Hotel</p>
                            <p className="text-gray-400 text-xs">Phòng 01 giường đôi cho 2 người</p>
                        </div>

                    </div>
                )
            },
        },

        {
            title: 'Giá',
            dataIndex: '',
            render: (record, _, index) => <span>đ1.650.0000</span>,
        },



        {
            title: '',
            dataIndex: '',
            render: (i, row) => <Button type="text" danger onClick={() => onChangeStatus && onChangeStatus(row)}><IconTrash /></Button>
        },

    ];
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

    const Header = () => {
        return (
            <div id={tab_filter_id} className="space-y-4">
                <p className="text-lg font-semibold">Giá khách VIP (20)</p>

                <div className="flex justify-between">

                    <div className="space-y-2">
                        <div className='flex justify-between items-center gap-4'>
                            <div className='flex justify-between items-center gap-2'>
                                <IconLocation className="w-[20px] h-[20px]" />
                                <span className="text-gray-500 font-medium">Chi nhánh</span>
                            </div>
                            <span className='text-base font-semibold'>TP.HCM</span>
                        </div>

                        <div className='flex justify-between items-center gap-4'>
                            <div className='flex justify-between items-center gap-2'>
                                <IconPeople />
                                <span className="text-gray-500 font-medium">Khách hàng</span>
                            </div>
                            <span className='text-base font-semibold'>Toàn bộ khách hàng</span>
                        </div>

                    </div>

                    <div className="space-y-2">
                        <div className='flex justify-between items-center gap-4'>
                            <div className='flex justify-between items-center gap-2'>
                                <IconCalendar />
                                <span className="text-gray-500 font-medium">Hiệu lực</span>
                            </div>
                            <span className='text-base font-semibold'>11/09/20205 đến 11/02/2026</span>
                        </div>

                        <div className='flex justify-between items-center gap-4'>
                            <div className='flex justify-between items-center gap-2'>
                                <IconCalendar />
                                <span className="text-gray-500 font-medium">Thời gian lưu trú</span>
                            </div>
                            <span className='text-base font-semibold'>11/09/20205 đến 11/02/2026</span>
                        </div>

                    </div>




                </div>
                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm phòng"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                            // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                        }}
                    />
                    <Button type="primary" onClick={() => onEdit && onEdit(new Price())}>+ Thêm hạng phòng</Button>

                </div>
            </div>
        )
    };

    return (
        <div>

            <Table<Order>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={false}
                loading={loading}
                footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} showTotal={showTotal} />}
                expandable={{
                    showExpandColumn: false,
                }}
                style={{ height: tableMaxHeight }}
                scroll={{
                    // x: 1500,
                    y: tableMaxHeight - 100 // minus footer height
                }}
            />
        </div>
    )

}

