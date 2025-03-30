import { Table, TableProps } from "antd";
import { Guest } from "../../../../../models/guest/guest"



export const BookingHistory = ({ data }: { data: Guest }) => {

    return (
        <div>
            <Table<DataType> columns={columns} dataSource={dataSource} />

        </div>
    )
}

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Mã đặt phòng',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Thời gian',
        dataIndex: 'age',
    },
    {
        title: 'Thu ngân',
        dataIndex: 'address',
    
    },

    {
        title: 'Tổng cộng',
        dataIndex: 'address',
    },


];

const dataSource: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
