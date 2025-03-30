
import React, { useEffect, useState } from 'react';
import { GeneralInfor } from './component/general-infor';
import { FlatformList } from './component/flatform-list';
import { Room } from '../../../../../models/room/room';



export const RoomAndAssociationDetail = ({ input, onComplete }: { input: Room; onComplete?: () => void }) => {

    const [data, setData] = useState<Room>(new Room())
    const [tab, setTab] = useState<number>(1)


    useEffect(() => {
        setData(input);
    }, [input]);

    return (
        <div className="space-y-6 ">
            <div>
                <p className='text-2xl font-semibold'>{data.name}</p>
                <p className='text-gray-400'>{data.description}</p>
            </div>
            <div className='h-7 flex space-x-4'>
                <button className={tab == 1 ? `text-black border-b-2 border-black px-1 transition-opacity duration-200 ease-in-out` : 'text-gray-400'}
                    onClick={() => setTab(1)}
                >
                    <span>Thông tin chung</span>
                </button>
                <button className={tab == 2 ? `text-black border-b-2 border-black px-1 transition-opacity duration-200 ease-in-out` : 'text-gray-400'}
                    onClick={() => setTab(2)}
                >
                    <span>Danh sách phong</span>
                </button>
            </div>

            {
                tab == 1
                ? <GeneralInfor data={data}/>
                : <FlatformList />
            }


            <div className='flex justify-end'>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Chuyển phòng
                </button>
            </div>

        </div >
    )
};




