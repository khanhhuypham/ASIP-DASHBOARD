import { Table, TableProps } from "antd"
import { Guest } from "../../../../../models/guest/guest"

export const ReceiptHistory = ({ data }: { data: Guest }) => {

    return (
        <div className="space-y-4">
            <div className='flex justify-between border rounded-lg p-2'>
                <div className='w-full text-start '>
                    <p className='text-gray-500'>Tổng đã trả</p>
                    <p className='font-semibold text-xl'>1.000.000</p>
                </div>
                <div className='w-full text-start'>
                    <p className='text-gray-500'>Hoá đơn</p>
                    <p className='font-semibold text-xl'>5</p>
                </div>
         
                <div className='w-full text-start'>
                    <p className='text-gray-500'>Chưa thanh toán</p>
                    <p className='font-semibold text-xl'>230.000</p>
                </div>
            </div>

            <Table<DataType> columns={columns} dataSource={dataSource} />

        </div>
    )
}

interface DataType {
    key: string;
    name: string;
    created_at: string;
    employee:string;
    total: number;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Mã đặt phòng',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Thời gian',
        dataIndex: 'created_at',
    },
    {
        title: 'Thu ngân',
        dataIndex: 'employee',

    },

    {
        title: 'Tổng cộng',
        dataIndex: 'total',
    },


];

const dataSource: DataType[] = [
    {
        key: '1',
        name: 'HD0000001',
        created_at: "09:00 - 01/01/2025",
        employee:"Thu ngân",
        total: 1000000,
    
    },
    {
        key: '2',
        name: 'HD0000002',
        created_at: "09:00 - 01/01/2025",
        employee:"Thu ngân",
        total: 1000000,

    },
    {
        key: '3',
        name: 'HD0000003',
        created_at: "09:00 - 01/01/2025",
        employee:"Thu ngân",
        total: 1000000,
      
    },
];
