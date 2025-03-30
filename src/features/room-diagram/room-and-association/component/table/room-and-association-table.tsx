

import { Avatar, Button, Dropdown, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { tab_filter_id, tab_menu_id } from "../../../../../constants/tag-id";
import { OrderListProps } from "../../../../order/order-management";
import { Order } from "../../../../../models/order/order";
import IconThreedots from "../../../../../components/icons/icon-three-dots";
import IconTrash from "../../../../../components/icons/icon-trash";
import { IconEye } from "../../../../../components/icons/icon-group";
import IconPencil from "../../../../../components/icons/icon-pencil";
import { RoomListProps } from "../../room-and-association";
import { Room } from "../../../../../models/room/room";



export const RoomAndAssociationTable = ({
    data,
    page,
    limit,
    total_record,
    loading,
    active,
    onPageChange,
    onEdit,
    onChangeStatus,
    onShowDetail
}: RoomListProps) => {
    const [tableMaxHeight, setTableMaxHeight] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleResize = () => {
            let remainingHeight = window.innerHeight - (24 + 24 + 20 + 20 + 12 + 140);
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


    // const handleMenuClick: MenuProps['onClick'] = (e) => {
    //     // const { key } = e;
    //     switch (e.key) {
    //         case '0':
    //             // Call the onEdit function passed as a prop
    //             break;
    //         case '1':
    //             // onShowDetail && onShowDetail(new Order())// Call the onShowDetail function passed as a prop
    //             break;
    //         case '3':
    //             // Handle delete action
    //             // onChangeStatus && onChangeStatus(new Order())
    //             break;
    //         default:
    //             break;
    //     }
    // };

    const columns: ColumnsType<Room> = [

        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (record, _, index) => (page - 1) * limit + (index + 1),
            width: 60
        },

        {
            title: 'Tên phòng',
            dataIndex: 'name',
            key: '',
            render: (_, data) => {
                return (
                    <div className="flex items-center gap-2">
                        <Avatar size={40} shape="square" icon={<UserOutlined />} />
                        <p>{data.name}</p>
                    </div>
                )
            },
        },


        {
            title: 'Thuộc hạng phòng',
            dataIndex: 'room_type',
            key: '',
            render: (_, data) => <span>{data.room_type.name}</span>,
        },


        {
            title: 'Khu vực',
            dataIndex: 'area',
            key: '',
            // className:"text-center",
            render: (_, data) => <span>{data.area.name}</span>,

        },

        {
            title: 'Lịch kết nối',
            dataIndex: '',
            key: '',
            render: (record, _, index) => (
                <div>
                    <Avatar.Group>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                    </Avatar.Group>
                </div>
            ),
        },

        {
            title: 'Giá',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span>đ1.650.0000</span>,
        },

        {
            title: 'Trạng thái',
            dataIndex: 'active',
            render: (record, data) => {
                console.log(data.active)
                if (data.active) {
                    return <Tag color="green">Đang kinh doanh</Tag>
                } else {
                    return <Tag color="gray">Ngừng kinh doanh</Tag>
                }
            },
        },


        {
            title: '',
            dataIndex: '',
            key: '',
            render: (i, data) => (

                <Dropdown menu={{ items, onClick: (e) => {
                        switch (e.key) {
                            case '0':
                                // Call the onEdit function passed as a prop
                                onEdit && onEdit(data);
                                break;
                            case '1':
                                onShowDetail && onShowDetail(data); // Call the onShowDetail function passed as a prop
                                break;
                            case '3':
                                // Handle delete action
                                onChangeStatus && onChangeStatus(data)
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
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

    return (

        <div ref={tableRef}>
            <Table<Room>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={false}
                loading={loading}
                footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} showTotal={showTotal} />}
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
        label: "Chỉnh sửa phòng",
        icon: <IconPencil />,
        key: '0',
    },
    {
        label: "Chi tiết",
        icon: <IconEye />,
        key: '1',
    },

    {
        label: <span className="text-red-500">Xoá phòng</span>,
        key: '3',
        icon: <IconTrash />,
        // danger: true,
    },
];