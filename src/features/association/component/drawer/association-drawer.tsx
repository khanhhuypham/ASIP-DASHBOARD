import { Avatar, Divider, Drawer, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import IconCheck from "../../../../components/icons/icon-checked";
import InfiniteScroll from "react-infinite-scroll-component";
import { DataType } from "../../../booking/component/modal/add-stay/add-stay";
import { RoomList } from "./component/room-list";
import { AssociationList } from "./component/association-list";

export const AddAssociationDrawer = ({ open, setOpen }: { open: boolean, setOpen?: ((open: boolean) => void) }) => {

    const onClose = () => {
        setOpen && setOpen(false);
    };


    return (
        <Drawer title="Thêm kết nối" onClose={onClose} open={open}>
            {/* <RoomList/> */}
            <AssociationList/>
            <div className='flex justify-end'>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Tiếp theo
                </button>
            </div>
        </Drawer>
    )
}

