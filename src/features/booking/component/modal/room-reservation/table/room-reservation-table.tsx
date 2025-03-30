import { Button } from "antd";
import { useState } from "react";
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

import IconTrash from "../../../../../../components/icons/icon-trash";
import { Reservation } from "../room-reservation";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import IconCaretDownFill from "../../../../../../components/icons/icon-caret-down-fill";
import IconCaretRight from "../../../../../../components/icons/icon-caret-right-fill";


export interface RoomReservationTableProps {
    data: Reservation[];
    loading: boolean;
    page: number;
    limit: number;
    totalRecords: number;
    setPage?: (page: number) => void;
    setLimit?: (limit: number) => void;
    onEdit?: (value: Reservation) => void;
    onDelete?: (value: Reservation) => void;
}



export const RoomReservationTable = ({
    data,
    loading,
    page,
    limit,
    totalRecords,
    setPage,
    setLimit,
    onEdit,
    onDelete
}: RoomReservationTableProps) => {


    const columns: TableColumnsType<Reservation> = [
        { title: 'Hạng phòng', dataIndex: 'name' },
        { title: 'Phòng', dataIndex: 'age', },
        { title: 'Nhận phòng', dataIndex: 'checkin', },
        { title: 'Trả phòng', dataIndex: 'checkout', },
        {
            title: 'Dự kiến',
            dataIndex: 'scheduled_date',
            render: (value, record) => <span>{value} ngày</span>
        },
        { title: 'Giá', dataIndex: 'price' },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: () => <Button type="text" danger>   <IconTrash /> </Button>
        },
    ];


    return (
        <>
            <Table<Reservation>
                rowClassName={(record, index) => record.header ? 'table-row-dark' :  'table-row-light'}
                columns={columns}
                dataSource={data}
                expandable={{
                    expandIcon: ({ expanded, onExpand, record }) => {
                        if (record.header){

                            return expanded ? (
                                <div onClick={e => onExpand(record, e)}>
                                    <IconCaretRight />
                                </div>
                            ) : (
                                <div onClick={e => onExpand(record, e)}>
                                    <IconCaretDownFill />
                                </div>
                            )
                        }
                    },
                    rowExpandable: (record) => record.header && ((record.children?.length ?? 0) > 0),
                    onExpand: (expanded, record) =>{console.log("onExpand: ", record, expanded)

                    },
                    // defaultExpandedRowKeys: ['0'] 
                }}
            />
        </>
    );
};





