import { useEffect, useState } from "react";
import { tab_filter_id, tab_menu_id } from "../../../../constants/tag-id";
import Table, { ColumnsType } from "antd/es/table";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Input, MenuProps, Pagination, PaginationProps, Tag } from "antd";
import { Floor } from "../../../../models/booking/booking";
import bnbImage from "../../../../assets/images/airbnb-circle-image.png";
import IconThreedots from "../../../../components/icons/icon-three-dots";
import IconCheck from "../../../../components/icons/icon-checked";
import IconTrash from "../../../../components/icons/icon-trash";

export const BookingTable = ({ data,onChangeStatus }: { data: Floor[],onChangeStatus?:(() => void) }) => {
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

    const columns: ColumnsType<Floor> = [

        {
            title: 'STT',
            dataIndex: '',
            key: '',
            width: 80
        },

        {
            title: 'Mã đặt phòng',
            dataIndex: '',
            key: '',
            render: (record, _, index) => {
                return (
                    <div className="flex items-center gap-2">
                        <Avatar size={40} icon={<UserOutlined />} src={bnbImage} />
                        <div className="space-y-2">
                            <p className="text-blue-700 font-medium">DP000566</p>
                            <p className="text-gray-500"> 08:44 - 27/12/2024</p>
                        </div>
                    </div>
                )
            },
        },


        {
            title: 'Phòng Đặt',
            dataIndex: '',
            key: '',
            width: 120,
            render: (record, _, index) => {
                return (
                    <div className="space-y-2">
                        <p className="font-medium">P.205</p>
                        <p className="text-gray-500">Double</p>
                    </div>
                )
            }
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
                        </div>

                    </div>
                )
            }
        },


        {
            title: 'Nhận phòng',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span>14:00 29/12/2024</span>,

        },

        {
            title: 'Trả phòng',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <span>09:00 31/12/2024</span>,

        },

        {
            title: 'Trạng thái',
            dataIndex: '',
            key: '',
            render: (record, _, index) => <Tag>Chờ xác nhận</Tag>,
        },

        {
            title: '',
            dataIndex: '',
            key: '',
            render: (i, row) => (

                <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}  >
                    <Button icon={<IconThreedots />} onClick={(e) => { e.preventDefault() }} />
                </Dropdown>

            )
        },

    ];
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        // const { key } = e;
        switch (e.key) {
            case '0':
                // Call the onEdit function passed as a prop
                break;
            case '1':
                // onShowDetail && onShowDetail(new Order())// Call the onShowDetail function passed as a prop
                onChangeStatus && onChangeStatus()
                break;
            case '3':
                // Handle delete action
                console.log("Delete action triggered");
                break;
            default:
                break;
        }
    };
    const Header = () => {
        return (
            <div className="flex justify-between">
                <Input
                    placeholder="Tìm kiếm"
                    className="w-64"
                    prefix={<i className="fa-solid fa-magnifying-glass" />}
                    suffix={<i className="fa-solid fa-user-plus"></i>}
                    allowClear
                    onChange={(e) => {
                        // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                    }}
                />
            </div>
        )
    };


    return (
        <>
            <Header />
            <Table<Floor>
                columns={columns}
                // rowKey={(record) => record.id}
                dataSource={data}
                pagination={false}
                // loading={loading}
                // footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} showTotal={showTotal} />}
                expandable={{
                    showExpandColumn: false,
                }}
                style={{ height: tableMaxHeight }}
                scroll={{
                    x: 1500,
                    y: tableMaxHeight - 100 // minus footer height
                }}
            />
        </>
    )
}



const items: MenuProps['items'] = [
    {
        label: "Xác nhận đặt phòng",
        icon: <IconCheck className="text-red-500"/>,
        key: '0',
    },

    {
        label: <span className="text-red-500">Từ chối đặt phòng</span>,
        key: '1',
        icon: <IconTrash />
    },
];