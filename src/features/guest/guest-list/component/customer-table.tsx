import { Avatar, Button, Dropdown, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { tab_filter_id, tab_menu_id } from "../../../../constants/tag-id";
import IconThreedots from "../../../../components/icons/icon-three-dots";
import IconPencil from "../../../../components/icons/icon-pencil";
import { IconEye } from "../../../../components/icons/icon-group";
import IconTrash from "../../../../components/icons/icon-trash";
import IconExport from "../../../../components/icons/icon-export";
import { GuestListPageProps } from "../customer-management";
import { Guest } from "../../../../models/guest/guest";




export const GuestTable = ({
    data,
    page,
    limit,
    total_record,
    loading,
    onPageChange,
    onEdit,
    onChangeStatus,
    onShowDetail
}: GuestListPageProps) => {

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

    const columns: ColumnsType<Guest> = [

        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (record, _, index) => (page - 1) * limit + (index + 1),
            width: 60
        },



        {
            title: 'Mã KH',
            dataIndex: 'code',
        },


        {
            title: 'Tên khách hàng',
            dataIndex: '',
            key: '',
            render: (_, data) => {
                return (
                    <div className="flex items-center gap-2">
                        <div>
                            <Avatar size={40} icon={<UserOutlined />} src={process.env.REACT_APP_IMAGE_URL + data.avatar.url } />
                        </div>
                      
                        <div className="space-y-1">
                            <p>{data.name}</p>
                        </div>

                    </div>
                )
            }
        },


        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },

        {
            title: 'Tổng thanh toán',
            dataIndex: '',
            render: (record, _, index) => <span>đ1.650.0000</span>,
        },

        {
            title: 'Đã trả',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span className="text-green-500">đ1.650.0000</span>,
        },
        {
            title: 'Còn lại',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span>đ1.650.0000</span>,
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            render: (_,data) => (

                <Dropdown menu={{
                    items, onClick: (e) => {
                        switch (e.key) {
                            case '0':
                                onEdit && onEdit(data)// Call the onShowDetail function passed as a prop
                                break;
                            case '1':
                                onShowDetail && onShowDetail(data)// Call the onShowDetail function passed as a prop
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


    return (
        <div ref={tableRef}>
            <Table<Guest>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={false}
                loading={loading}
                footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} />}
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
        label: "Chi tiết",
        icon: <IconEye />,
        key: '1',
    },

    {
        label: "Xuất file báo cáo",
        icon: <IconExport />,
        key: '2',
    },

    {
        label: <span className="text-red-500">Xoá khách hàng</span>,
        key: '3',
        icon: <IconTrash />,
        // danger: true,
    },
];