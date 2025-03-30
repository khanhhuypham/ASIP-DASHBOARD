import { Avatar, Button, Dropdown, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Order } from "../../../../models/order/order";

import { tab_filter_id, tab_menu_id } from "../../../../constants/tag-id";
import { OrderListProps } from "../../../order/order-management";
import IconThreedots from "../../../../components/icons/icon-three-dots";
import IconPencil from "../../../../components/icons/icon-pencil";
import IconCheckSquare from "../../../../components/icons/icon-check-square";
import IconTrash from "../../../../components/icons/icon-trash";
import { IconEye } from "../../../../components/icons/icon-group";
import { RoomTypeListProps } from "../room-type";
import { RoomType } from "../../../../models/room-type/room-type";
import { ROOM_TYPE_STATUS } from "../../../../constants/enum";
import { MenuInfo } from "rc-menu/lib/interface";
import { convertToMoneyFormat } from "../../../../utils/string-utils";


export const RoomTypeTable = ({
    data,
    // page,
    // limit,
    // total_record,
    loading,
    // onPageChange,
    onEdit,
    onChangeStatus,
    onShowDetail
}: RoomTypeListProps) => {
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

    const columns: ColumnsType<RoomType> = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (record, _, index) => index + 1,
            width: 60
        },
        {
            title: 'Mã hạng phòng',
            dataIndex: 'code',
        },
        {
            title: 'Tên hạng phòng',
            dataIndex: 'name',
        },
        {
            title: 'Số lượng phòng',
            dataIndex: 'room',
            key: 'room',
            render: (_, data, index) => <span>{data.room.length}</span>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (record, data) => <span>{convertToMoneyFormat(data.price)}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: '',
            key: '',
            render: (_, data) => {
                if (data.status == ROOM_TYPE_STATUS.ACTIVE) {
                    return <Tag color="green">Đang kinh doanh</Tag>;
                } else {
                    return <Tag color="gray">Ngừng kinh doanh</Tag>;
                }
            },
        },
        {
            dataIndex: '',
            key: '',
            render: (i, data) => (
                <Dropdown menu={{
                    items, onClick: (e: MenuInfo) => {
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
            <Table<RoomType>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                // pagination={true}
                loading={loading}
                // footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} showTotal={showTotal} />}
                tableLayout="auto"
                scroll={{
                    x: 1500,
                    y: tableMaxHeight - 100 // minus footer height
                }}
            />

        </div>
    );
};


const items: MenuProps['items'] = [
    {
        label: "Chỉnh sửa hạng phòng",
        icon: <IconPencil />,
        key: '0',
    },
    {
        label: "Chi tiết",
        icon: <IconEye />,
        key: '1',
    },
    {
        label: <span className="text-red-500">Xoá hạng phòng</span>,
        key: '3',
        icon: <IconTrash />,
        // danger: true,
    },
];