import { Avatar, Button, Dropdown, Input, MenuProps, Switch, Table, TableColumnsType, TableProps, Tag } from "antd";
import airbnbLogo from "../../../../assets/images/airbnb-circle-image.png"
import { useState } from "react";
import IconCaretDownFill from "../../../../components/icons/icon-caret-down-fill";
import IconThreedots from "../../../../components/icons/icon-three-dots";
import IconTrash from "../../../../components/icons/icon-trash";
import IconPencil from "../../../../components/icons/icon-pencil";
import IconBoxArrowRightUp from "../../../../components/icons/icon-box-arrow-right-up";
import IconPlug from "../../../../components/icons/icon-plug";


interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Tên Phòng',
        dataIndex: 'name',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Thuộc hạng phòng',
        dataIndex: '',
        render: (text: string) => <span>Double</span>,
    },
    {
        title: 'Khu vực',
        dataIndex: '',
        render: (text: string) => <span>Tầng 2</span>,
    },

    {
        title: 'Trạng thái',
        dataIndex: '',
        render: (text: string) => <Tag color="green">Đã kết nối</Tag>
        ,
    },

    {
        title: '',
        dataIndex: '',
        key: '',
        render: (i, row) => (

            <Dropdown menu={{ items}} trigger={['click']}  >
                <Button icon={<IconThreedots />} onClick={(e) => {e.preventDefault()}}/>
            </Dropdown>

        )
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park',
    },
];

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};


const AssociationFlatformTable = () => {

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    


    return (
        <div>
            <div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <IconCaretDownFill/>
                        <Avatar className="w-[40px] h-[40px]" src={airbnbLogo} />
                        <p className="text-base font-semibold">Airbnb</p>
                    </div>

                    <Input
                        placeholder="Tìm kiếm tên phòng"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}

                        allowClear
                        onChange={(e) => {
                            // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                        }}
                    />
                </div>
            </div>

            <Table<DataType>
                rowSelection={{ type: selectionType, ...rowSelection }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );


}

export default AssociationFlatformTable;



const items: MenuProps['items'] = [

    {
        label: "Kết nối lịch",
        icon: <IconPlug />,
        key: '0',
    },
    {
        label: "Chỉnh sửa",
        icon: <IconPencil className="w-[20px] h-[20px]"/>,
        key: '1',
    },
    {
        label: "Chi tiết kết nối",
        icon: <IconBoxArrowRightUp  className="w-[20px] h-[20px]"/>,
        key: '2',
    },

    {
        label: <span className="text-red-500">Xoá kết nối lịch</span>,
        key: '3',
        icon: <IconTrash />,
        // danger: true,
    },
];