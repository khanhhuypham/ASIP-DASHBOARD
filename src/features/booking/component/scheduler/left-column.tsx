import { useCallback, useEffect, useState } from "react";
import { PickerMode } from "../../booking-page";
import { CaretRightOutlined, ClearOutlined, DotChartOutlined } from '@ant-design/icons';
import { table_header_id } from "../../../../constants/tag-id";
import { Floor } from "../../../../models/booking/booking";



export function LeftColumn(
    { dateType,floors, headerHeight, cellheight, leftColWidth, onChange }:
    { dateType:PickerMode,floors: Floor[], headerHeight: number, cellheight: number, leftColWidth: number, onChange?: ((arg0: Floor) => void) }
) {
    const toggleIsExpanded = useCallback((floor: Floor) => {
        if (onChange) {
            onChange({ ...floor, isExpand: !floor.isExpand });
        }
    }, []);

    const [paddingTop, setPaddingTop] = useState<number>(50)

    useEffect(() => {
        const header = document.getElementById(table_header_id) as HTMLElement
        setPaddingTop(header.offsetHeight == 0 ? 20 : header.offsetHeight)
    }, [dateType])

    return (
        <div className="flex-none" style={{ width: leftColWidth, paddingTop: paddingTop }}>

            <div className="border-t-2">
                {floors.map((floor, index) => (
                    <div key={index}>
                        <button onClick={() => toggleIsExpanded(floor)} className="text-start" style={{ height: headerHeight }}><CaretRightOutlined /> {floor.name}</button>
                        <div className="duration-200 overflow-hidden flex flex-col justify-between"
                            style={{
                                height: floor.isExpand ? cellheight * floor.rooms.length : 0,
                                transitionProperty: "height"
                            }}
                        >
                            {floor.rooms.map((room, hour) => (
                                <div className="h-full flex items-center gap-2 border-b-2">
                                    {room.clean ? <ClearOutlined /> : <DotChartOutlined />}
                                    <span>{room.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}


