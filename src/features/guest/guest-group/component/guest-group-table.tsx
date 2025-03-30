import { Avatar, Button, Dropdown, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Order } from "../../../../models/order/order";

import { tab_filter_id, tab_menu_id } from "../../../../constants/tag-id";
import { OrderListProps } from "../../../order/order-management";
import IconThreedots from "../../../../components/icons/icon-three-dots";
import IconPencil from "../../../../components/icons/icon-pencil";
import { IconEye } from "../../../../components/icons/icon-group";
import IconTrash from "../../../../components/icons/icon-trash";
import IconExport from "../../../../components/icons/icon-export";
import { GuestGroup } from "../../../../models/guest/guest-group";
import { GuestGroupListProps } from "../guest-group";



export const GuestGroupTable = ({
    data,
    loading,
    onEdit,
    onChangeStatus,
}: GuestGroupListProps) => {
    const [tableMaxHeight, setTableMaxHeight] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            let remainingHeight = window.innerHeight - (24 + 24 + 20 + 20 + 12 + 140 + 30);
            const header = document.querySelector(".navbar") as HTMLElement;
            const tab = document.getElementById(tab_menu_id) as HTMLElement;
            const filter = document.getElementById(tab_filter_id) as HTMLElement;

            if (header) {
                remainingHeight -= header.offsetHeight;
            }
            if (tab) {
                remainingHeight -= tab.offsetHeight;
            }
            if (filter) {
                remainingHeight -= filter.offsetHeight;
            }

            console.log(remainingHeight)

            setTableMaxHeight(remainingHeight);

            if (tableRef.current) {
                const tableBody = tableRef.current.querySelector('.ant-table-body');
                if (tableBody) {
                    (tableBody as HTMLElement).style.minHeight = `${remainingHeight}px`;
                }
            }

        };
        handleResize();
        // window.addEventListener("resize", handleResize);
        // return () => window.removeEventListener("resize", handleResize);

    }, []);

    const columns: ColumnsType<GuestGroup> = [

        {
            title: 'STT',
            dataIndex: '',
            render: (record, _, index) => index + 1,
            width: 60
        },

        {
            title: 'Nhóm khách hàng',
            dataIndex: 'name',
        },


        {
            title: 'SL khách hàng',
            dataIndex: 'guests',
            render: (_, data) => <span> {data.guests.length}</span>
        },


        {
            title: 'Thời gian tạo',
            dataIndex: 'created_at',
        },

        {
            title: 'Giảm giá',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span>đ100.000</span>,

        },

        {
            title: '',
            dataIndex: '',
            render: (i, data) => (
                <Dropdown menu={{
                    items, onClick: (e) => {
                        switch (e.key) {
                            case '0':
                                // Call the onEdit function passed as a prop
                                onEdit && onEdit(data);
                                break;
                   
                            case '1':
                                // Handle delete action
                                onChangeStatus && onChangeStatus(data);
                                break;
                            default:
                                break;
                        }
                    }
                }} trigger={['click']}  >
                    <Button icon={<IconThreedots />} onClick={(e) => { e.preventDefault() }} />
                </Dropdown>

            )
        },
    ];


    return (
        <div ref={tableRef}>
            <Table<GuestGroup>

                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                loading={loading}
                expandable={{
                    showExpandColumn: false,
                }}
                scroll={{
                    x: 1500,
                    y: tableMaxHeight - 100 // minus footer height
                }}
            />
        </div>
    )


}


const items: MenuProps['items'] = [
    {
        label: "Chỉnh sửa hạng phòng",
        icon: <IconPencil />,
        key: '0',
    },

    {
        label: <span className="text-red-500">Xoá nhóm khách hàng</span>,
        key: '1',
        icon: <IconTrash />,
        // danger: true,
    },
];