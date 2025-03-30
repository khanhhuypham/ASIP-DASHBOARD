import { useCallback, useEffect, useRef, useState } from "react";
import { PickerMode } from "../../booking-page";
import { CaretRightOutlined, ClearOutlined, DotChartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Input, Tag } from "antd";
import { scheduler_id, table_header_id } from "../../../../constants/tag-id";
import { LeftColumn } from "./left-column";
import { RightColumn } from "./right-column";
import { Floor } from "../../../../models/booking/booking";
import { BlockTime } from "../../../../models/block-time/block-time";



export const Scheduler = ({
    dateRange,
    dateType,
    data
}: {
    dateRange: BlockTime[]
    dateType: PickerMode
    data: Floor[]
}) => {

    const headerHeight = 30
    const leftColWidth = 140
    const cellheight = 100

    const [floors, setFloors] = useState<Floor[]>([])
    const [cellwidth, setCellwidth] = useState<number>(150)

    useEffect(() => {
        setFloors(data)

        if (dateType == "week") {

            const scheduler = document.getElementById(scheduler_id) as HTMLElement;

            if (scheduler) {

                const width = (scheduler.offsetWidth - leftColWidth) / 7

                setCellwidth(width < 150 ? 150 : width)
            }

        } else {
            setCellwidth(150)
        }

    }, [dateType])

    const handleFloorChange = (updatedFloor: Floor) => {
        setFloors(prevFloors =>
            prevFloors.map(floor =>
                floor.name === updatedFloor.name ? updatedFloor : floor
            )
        );
    };

    const Header = () => {
        return (
            <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                            // setParameter({ ...parameter, page: 1, search_key: e.target.value ?? "" });
                        }}
                    />


                    <div className="flex justify-between gap-3">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-purple-600" />
                            <span className="text-sm">Đặt trước(11)</span>
                        </label>

                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-cyan-200" />
                            <span className="text-sm">Đang sử dụng(11)</span>
                        </label>

                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-amber-400" />
                            <span className="text-sm">Sắp nhận(11)</span>
                        </label>

                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-gray-600" />
                            <span className="text-sm">Đã trả phòng(11)</span>
                        </label>
                    </div>
            </div>
        )
    };

    return (

        <>
            <Header/>
            <div className="flex overflow-auto" id={scheduler_id}>
                <div className="">
                    <LeftColumn
                        floors={floors}
                        headerHeight={headerHeight}
                        cellheight={cellheight}
                        leftColWidth={leftColWidth}
                        onChange={handleFloorChange}
                        dateType={dateType}
                    />
                </div>

                <div>
                    <RightColumn
                        headerHeight={headerHeight}
                        cellWidth={cellwidth}
                        cellheight={cellheight}
                        floors={floors}
                        blockTime={dateRange}
                        dateType={dateType}
                    />
                </div>

            </div>
        </>




    )

}

