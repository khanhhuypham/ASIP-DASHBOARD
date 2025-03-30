import { Avatar, List } from "antd";
import { TabBar } from "../../../../components/custom/tab-bar";
import { Guest } from "../../../../models/guest/guest";
import { GUEST_TYPE } from "../../../../constants/enum";
import { GuestInfor } from "./guest-info/guest-info";
import { useState } from "react";
import { BookingHistory } from "./guest-info/booking-history";
import { ReceiptHistory } from "./guest-info/receipt-history";


export const GuestDetail = ({ data }: { data: Guest }) => {

    const [tab, setTab] = useState<number>(1)
    
    const tabs = [
        { id: 1, label: "Thông tin chung " },
        { id: 2, label: "Lịch sử đặt phòng(30)" },
        { id: 3, label: "Hoá đơn (8)" },
    ];

    const renderBody = () => {
        switch (tab) {
            case 1:
                return <GuestInfor data={data}/>
            case 2:
                return <BookingHistory data={data}/>
            case 3:
                return <ReceiptHistory data={data}/>

        }
    }

    return (
        <div className="space-y-4">


            <TabBar tabs={tabs} onChange={(value) => {
                setTab(value)
            }} />

            <>
              
                {renderBody()}
            </>
        </div>
    )
}