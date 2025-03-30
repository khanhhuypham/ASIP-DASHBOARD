import { Avatar } from "antd"
import IconCheck from "../../../../../components/icons/icon-checked"
import airbnbLogo from "../../../../../assets/images/airbnb-circle-image.png"


export const AssociationCard = ({ select }: { select: boolean }) => {



    const Link = () => {
        return (
            <div className="border rounded-lg p-2">
                <div>
                    <p className="text-xs text-gray-400">Liên kết của ASIP</p>
                    <p>https://asip.vn/ve-asip</p>
                </div>

            </div>

        )
    }


    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">

                <div className="flex items-center gap-2">
                    <div>
                        <Avatar className="w-[40px] h-[40px]" src={airbnbLogo} />
                    </div>

                    <div>
                        <p className="font-semibold">Kết nối với Airbnb</p>
                        {select && <p className="text-xs text-gray-500">Lấy liên kết ở phần Kết nối lịch của Airbnb, sau đó thêm liên kết đó vào phần dưới đây.</p>}
                    </div>
                </div>


                {
                    select
                        ? (

                            <div className="p-1 bg-blue-700 rounded">
                                <IconCheck className="w-3 h-3" />
                            </div>
                        )
                        : (
                            <div >
                                <div className="w-[20px] h-[20px] border-[1px] border-blue-700 rounded"></div>
                            </div>
                        )
                }


            </div>
            {select && <Link />}

        </div>
    )


}
