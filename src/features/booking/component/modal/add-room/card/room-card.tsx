import IconCallout from "../../../../../../components/icons/icon-callout"
import IconCheck from "../../../../../../components/icons/icon-checked"
import IconPeople from "../../../../../../components/icons/icon-people"

export const RoomCard = ({active}:{active:boolean}) => {
    return (
        <div className={`flex p-2 rounded-xl my-4 ${active ? "bg-blue-100 border border-blue-600" : "bg-gray-100 border border-gray-200"}`}>
            <div></div>
            <div className="space-y-2 flex-1">
                <p className="font-semibold">P.205 - Phòng 01 giường đôi 2 người</p>
                <div className="flex gap-2">
                    <IconPeople />
                    <div>
                        <p>2 người lớn, 0 trẻ em</p>
                        <p>Double - 6 phòng trống</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <IconCallout />
                    <span className="text-blue-600">đ1.200.000</span>
                </div>
            </div>
            <div className="w-fit">
                <div className="p-1 bg-blue-700 rounded-full">
                    <IconCheck/>
                </div>
            </div>
        </div>
    )
} 