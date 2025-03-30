import { Avatar, Button, Switch } from "antd";
import airbnbLogo from "../../../../assets/images/airbnb-circle-image.png"


const AssociationFlatformCard = ({onDisconnect,onAddAssociation}:{onDisconnect?:(() => void),onAddAssociation?:(() => void)}) => {

    return (
        <div className="w-full rounded-xl border p-3 space-y-2">
            <div className="flex justify-between content-start gap-2">
                <div className="flex items-center gap-2">
                    <Avatar className="w-[40px] h-[40px]" src={airbnbLogo} />
                    <div className="space-y-1">
                        <p className="text-base font-semibold">Airbnb</p>
                        <p className="text-gray-500">Xem liên kết</p>
                    </div>
                </div>

                <div >
                    <Switch defaultChecked onChange={() => {
                        console.log("Huy")
                        onDisconnect && onDisconnect()
                    }}/>
                </div>

            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-md"></div>
                <span className="font-medium">40 phòng đang kết nối</span>
            </div>

            <Button variant="outlined" className="w-full" onClick={onAddAssociation}>+ Thêm link kết</Button>
        </div>
    )


}

export default AssociationFlatformCard;
