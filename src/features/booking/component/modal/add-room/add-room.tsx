import React, { useEffect, useState } from 'react';

import { Button, DatePicker, Input } from 'antd';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RoomCard } from './card/room-card';

interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}


const { RangePicker } = DatePicker;


export const AddRoom = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);


    return (
        <div className='space-y-4'>
            <div className='flex flex-col gap-4'>
                <div>
                    <p className="font-bold text-lg">Chọn phòng</p>
                    <p className="text-gray-500">Hãy chọn phòng hoặc nhiều phòng để thực hiện đặt/nhận phòng</p>
                </div>
                <RangePicker />
                

                <Input
                    placeholder="Tìm kiếm hạng phòng"
                    className="w-64"
                    prefix={<i className="fa-solid fa-magnifying-glass" />}
                    allowClear
                    onChange={(e) => {
                        // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                    }}
                />
            </div>

            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item,index) => (
                            <RoomCard active={index%2 == 0 ? true : false}/>
                        )}
                    />
                </InfiniteScroll>
            </div>
            <div className='flex justify-end'>
                <Button type="primary" size='middle'>
                    <span className='font-medium'>Thêm phòng đ1.650.000 (2)</span>
                </Button>
            </div>
        </div>
    )
};

