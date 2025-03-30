import { useEffect, useState } from "react";
import { DataType } from "../../../../booking/component/modal/add-stay/add-stay";
import { Avatar, Divider, List, Skeleton } from "antd";
import IconCheck from "../../../../../components/icons/icon-checked";
import InfiniteScroll from "react-infinite-scroll-component";

export const RoomList = () => {

    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);

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


    const RoomTypeCard = ({ active }: { active: boolean }) => {
        return (
            <div className={`flex p-2 rounded-xl my-4 gap-3 ${active ? "bg-blue-100 border border-blue-600" : "bg-gray-100 border border-gray-200"}`}>

                <div className="flex flex-1 gap-2">
                    <Avatar shape="square" className="w-[40px] h-[40px]" src="https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1393940220.jpg?c=16x9&q=h_144,w_256,c_fill" />
                    <div>
                        <p className="font-semibold">2 người lớn, 0 trẻ em</p>
                        <p>Double - 6 phòng trống</p>
                    </div>
                </div>

                <div className="w-fit">
                    <div className="p-1 bg-blue-700 rounded-full">
                        <IconCheck />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            id="scrollableDiv"
            style={{
                height: "100%",
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
                    renderItem={(item, index) => (
                        <RoomTypeCard active={index % 2 == 0 ? true : false} />
                    )}
                />
            </InfiniteScroll>
        </div>

    )
}