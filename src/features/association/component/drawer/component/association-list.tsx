import { Avatar, Button } from "antd"
import airbnbLogo from "../../../../../assets/images/airbnb-circle-image.png"
import IconCheck from "../../../../../components/icons/icon-checked"
import { AssociationCard } from "./association-card"
import { useState } from "react"



export const AssociationList = () => {
    const [select, setSelect] = useState(false)



    return (

        <div className="space-y-4"> 
            <div className="flex items-center">
                <div className="-translate-x-4 w-8 h-8 rounded-full bg-blue-600 flex justify-center items-center">
                    <span className="text-white">2</span>

                </div>
                <span className="text-lg font-semibold text-blue-600">Kết nối lịch phòng</span>
            </div>

            <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                <div className="space-y-2">
                    <div >
                        <p className="font-semibold">Kết nối ASIP</p>
                        <p className="text-xs text-gray-500">Hãy dán liên kết dưới đây vào các trang web còn lại</p>

                    </div>
                    <div className="border rounded-lg p-2 flex justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Liên kết của ASIP</p>
                            <p>https://asip.vn/ve-asip</p>
                        </div>
                        <Button type="text" icon={<i className="fa-regular fa-copy"></i>}
                            onClick={() => {
                                setSelect(!select)
                            }}
                        />

                    </div>
                </div>

                <div className="space-y-4">
                    <AssociationCard select={true} />
                    <AssociationCard select={true} />
                    <AssociationCard select={false} />
                </div>


            </div>

        </div>

    )

}
