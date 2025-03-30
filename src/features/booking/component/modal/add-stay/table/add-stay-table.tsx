import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import IconEdit from '../../../../../../components/icons/icon-edit';
import { DataType } from '../add-stay';
import IconTrash from '../../../../../../components/icons/icon-trash';
import IconPencil from '../../../../../../components/icons/icon-pencil';


export interface StayTableProps {
    data: DataType[];
    loading: boolean;
    page: number;
    limit: number;
    totalRecords: number;
    setPage?: (page: number) => void;
    setLimit?: (limit: number) => void;
    onEdit?: (value: DataType) => void;
    onDelete?: (value: DataType) => void;
}

const AddStayTable = ({
    data,
    loading,
    page,
    limit,
    totalRecords,
    setPage,
    setLimit,
    onEdit,
    onDelete
}: StayTableProps) => {


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Thông tin cá nhân',
            dataIndex: 'infor',
            key: 'infor',

        },

        {
            title: 'Phòng',
            dataIndex: 'room',
            key: 'room',
            width: 30,
        },
        {
            title: 'Thời gian khai báo',
            dataIndex: 'declarationDate',
            key: 'declarationDate',
        },
        {
            title: 'Thời gian lưu trú',
            dataIndex: 'stayDuration',
            key: 'stayDuration',
        },
        {
            width: 70,
            render: (_, record) => (
                <div className="flex justify-center">
                    <Button type="text" className="w-6"
                        onClick={() => {onEdit && onEdit(record)}}
                        icon={ <IconPencil/>}
                    />
                       
                    <Button type="text" className="w-6" danger
                        onClick={() => {onDelete && onDelete(record)}}
                        icon={ <IconTrash/>}
                    /> 
                      
                </div>
            ),
        },
    ];

    return (
        <Table<DataType> columns={columns} dataSource={data}/>
    )
};

export default AddStayTable;