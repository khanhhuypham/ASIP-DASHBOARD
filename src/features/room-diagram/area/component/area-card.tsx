import { Button, Input, Tag } from "antd";
import IconCaretDownFill from "../../../../components/icons/icon-caret-down-fill";
import IconBroom from "../../../../components/icons/icon-broom";
import IconPeople from "../../../../components/icons/icon-people";
import IconKidFace from "../../../../components/icons/icon-kid-face";
import IconRoom from "../../../../components/icons/icon-room";
import { Room } from "../../../../models/room/room";
import { ROOM_CLEANLINESS, ROOM_STATUS } from "../../../../constants/enum";
import IconStars from "../../../../components/icons/icon-stars";


export const AreaCard = (
    { data, selectionEnabled, onConfirm, onSelect }:
    { data: Room, selectionEnabled: boolean, onConfirm?: (() => void), onSelect?: ((agr0: Room) => void) }
) => {

    const renderStatusBadge = () => {
        switch (data.status) {
            case ROOM_STATUS.AVAILABLE:
                return (
                    <span className="p-2 border bg-gray-100 border-gray-600 rounded-lg text-gray-600">
                        Phòng trống
                    </span>
                );
            case ROOM_STATUS.OCCUPIED:
                return (
                    <span className="p-2 border bg-green-100 border-green-600 rounded-lg text-green-600">
                        Đang sử dụng
                    </span>
                );

            default:
                return (
                    <span className="p-2 border bg-gray-100 border-gray-500 rounded-lg text-gray-500">
                        Không xác định
                    </span>
                );
        }
    };

    const renderCleanliness = () => {

        if (!selectionEnabled) {

            let icon = <></>
            let iconColor = ""; // Store the color class

            if (data.status === ROOM_STATUS.OCCUPIED) {
                return null; // Or return an empty fragment:  <></>
            }


            switch (data.cleanliness) {
                case ROOM_CLEANLINESS.CLEAN:
                    iconColor = "bg-blue-100"
                    icon = <IconStars />;
                    break;
                case ROOM_CLEANLINESS.DIRTY:
                    iconColor = "bg-red-100"
                    icon = <IconBroom />
                    break;
                default:
                    return (
                        <span className="p-2 border bg-gray-100 border-gray-500 rounded-lg text-gray-500">
                            Không xác định
                        </span>
                    );
            }



            return (
                <button
                    className={`p-2 rounded-full ${iconColor}`}  // Removed bg-red-50, we'll use dynamic coloring
                    onClick={() => onConfirm && onConfirm()}
                >
                    {icon}
                </button>
            )


        } else {

            return <input
                type="checkbox"
                className="form-checkbox rounded-[3px] h-4 w-4 border-purple-600"
                onChange={(e) => {

                    onSelect && onSelect({...data,select:e.target.checked})
                }}
            />
        }


    };



    return (
        <div className="border rounded-lg space-y-2 p-3">
            <div className="flex items-center justify-between gap-2">
                {renderStatusBadge()}
                {renderCleanliness()}
            </div>

            <div className="flex flex-col sm:flex-row justify-start gap-3">
                <span className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg w-16">
                    <IconPeople />
                    <span>01</span>
                </span>

                <span className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg  w-16">
                    <IconKidFace />
                    <span>01</span>
                </span>

            </div>
            <p className="text-base font-semibold">{data.name}</p>


            <div className="flex items-center gap-2">
                <IconRoom />
                <span>{data.room_type.name}</span>
            </div>

        </div>
    )
}