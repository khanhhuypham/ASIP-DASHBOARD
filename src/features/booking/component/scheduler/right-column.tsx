import { useCallback, useEffect, useState } from "react";
import { PickerMode } from "../../booking-page";
import { CaretRightOutlined, ClearOutlined, DotChartOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tag } from "antd";
import { table_header_id } from "../../../../constants/tag-id";
import { Booking, Floor, Room } from "../../../../models/booking/booking";
import { getDayName } from "../../../../utils/time-utils";
import { BlockTime } from "../../../../models/block-time/block-time";



export function RightColumn(
    { floors, headerHeight, cellWidth, cellheight, blockTime, dateType }:
        { floors: Floor[], headerHeight: number, cellWidth: number, cellheight: number, blockTime: BlockTime[], dateType: PickerMode }
) {

  const RenderTimeLine = ({ innerBlock, showTime = false }: { innerBlock: number[], showTime?: boolean }): JSX.Element => {
        const currentDate = new Date();
        const width = cellWidth / innerBlock.length;
        const isActive = (value: number) => {
            switch (dateType) {
                case "date":
                    return currentDate.getMinutes() === value;

                case "week":
                    return currentDate.getHours() === value;

                case "month":
                    return currentDate.getHours() === value;

                default:
                    return false;
            }
        };
        if (innerBlock.length == 0) {
            return <></>
        } else {
            return (
                <div className="absolute inset-0 z-10 w-full flex">
                    {innerBlock.map((value, index) => (
                        <div
                            key={index}
                            style={{ width: width }}
                            className={showTime ? "flex flex-col items-center" : "flex justify-center"} // Added relative positioning
                        >
                  
                            {showTime && isActive(value) && ( // Conditional rendering here
                                <p className="text-white text-[12px] bg-blue-600 rounded-full px-2">
                                    {currentDate.getHours() + ":" + currentDate.getSeconds()}
                                </p>
                            )}
                            {isActive(value) && <div className="w-[2px] h-full bg-blue-600"></div>}
                        </div>
                    ))}
                </div>
            );
        }
    };



    const RenderRoom = ({ room }: { room: Room }) => {
        return (
            <>
                {blockTime.map((block, i) => {

                    let element: JSX.Element = (
                        <div
                            key={i + "room"}
                            className="relative h-full border-[1px] flex justify-between overflow-hidden"
                            style={{ width: cellWidth }}
                        >
                            <RenderTimeLine innerBlock={block.innerBlock} />
                        </div>
                    )

                    room.bookings.forEach((booking, _) => {
                        if (booking.colspanFrom == i) {
                            element = <RenderBooking booking={booking} blockTime={block} />
                        } else if (i > booking.colspanFrom && i <= booking.colspanTo) {
                            element = <></>
                        }
                    })

                    return element
                })}
            </>
        );
    };




    const RenderBooking = ({ booking, blockTime }: { booking: Booking, blockTime: BlockTime }) => {

        const bandWidth = ((booking.colspanTo ?? 1) - (booking.colspanFrom ?? 0)) + 1

        return (
            <div className="h-full relative">
                <RenderTimeLine innerBlock={blockTime.innerBlock} />
                <div className="h-full border-[1px] p-2 flex justify-center overflow-hidden" style={{ width: bandWidth * cellWidth }}>
                    <div className="border-2 rounded-lg text-center p-2 w-full" style={{ background: booking.bgColor, borderColor: booking.borderColor }}>
                        <div className="space-y-2">
                            <p className="text-start">{booking.customerName}</p>
                            <div className="flex items-center font-medium">
                                <Tag className="text-white" style={{ background: booking.borderColor }}>{booking.start}</Tag>
                                <Tag className="text-white" style={{ background: booking.borderColor }}>{booking.end}</Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="flex items-center" id={table_header_id}>
                {blockTime.map((block, index) => (
                    <div key={index} className="border-x-[1px] text-center" style={{ width: cellWidth }}>
                        {
                            dateType === "date"
                                ? <p>{block.date.getHours() + ":00"}</p>
                                :
                                <div>
                                    <p className="font-bold text-lg">{block.date.getDate()}</p>
                                    <hr />
                                    <p>{getDayName(block.date.getDay(), dateType)}</p>
                                </div>
                        }

                    </div>
                ))}
            </div>

            <div>
                {floors.map((floor, index) => (
                    <div key={index + "floor"}>
                        <div className="bg-gray-200 flex" style={{ height: headerHeight }}>
                            {blockTime.map((block, i) => (
                                <div
                                    key={"floor-" + index + "-header" + i}
                                    className="relative  overflow-hidden"
                                    style={{ width: cellWidth }}
                                >
                                    <RenderTimeLine innerBlock={block.innerBlock} showTime={index == 0 ? true : false} />
                                </div>
                            ))}
                        </div>
                        <div className="duration-200 overflow-hidden "
                            style={{
                                height: floor.isExpand ? cellheight * floor.rooms.length : 0,
                                transitionProperty: "height"
                            }}
                        >
                            {floor.rooms.map((room, index) => (
                                <div
                                    key={index}
                                    className="flex items-center"
                                    style={{ height: cellheight }}
                                >
                                    <RenderRoom room={room} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}




