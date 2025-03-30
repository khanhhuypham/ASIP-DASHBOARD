import { Button, Dropdown, MenuProps, Modal } from "antd";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import IconCaretDownFill from "../../../../components/icons/icon-caret-down-fill";
import { AreaCard } from "./area-card";
import IconThreedots from "../../../../components/icons/icon-three-dots";
import IconTrash from "../../../../components/icons/icon-trash";
import IconPencil from "../../../../components/icons/icon-pencil";
import IconCheckSquare from "../../../../components/icons/icon-check-square";
import { Area } from "../../../../models/area/area";
import { PopupInterface } from "../../../../constants/popup-interface";
import { DialogContent } from "../../../../components/custom/dialog-content";
import { Room } from "../../../../models/room/room";
import IconBroom from "../../../../components/icons/icon-broom";
import { ROOM_CLEANLINESS } from "../../../../constants/enum";
import IconStars from "../../../../components/icons/icon-stars";
import IconPlusCircle from "../../../../components/icons/icon-plus-circle";

export const Storey = (
    { input,onEdit,onDelete }: 
    { 
        input: Area,
        onEdit?:((arg0:Area) => void),
        onDelete?:((arg0:Area) => void)
    }
) => {
    const [data, setData] = useState<Area>(new Area());
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const [selectionEnabled, setMSelectionEnabled] = useState<boolean>(false);


    //========================================================
    const [expand, setExpand] = useState<boolean>(false);
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    /*
    1.Use useLayoutEffect Instead of useEffect:
        useLayoutEffect runs synchronously after DOM updates but before the browser paints, ensuring that the DOM elements are available for measurement.
        This is crucial for getting accurate measurements of header and content heights.

    2. Use useRef for DOM Elements:
        Instead of using document.getElementById, we use useRef to directly reference the header and content divs.
        This is more React-friendly and avoids potential issues with DOM manipulation.
    */

    // Update data and expand state when input changes
    useEffect(() => {
        setData(input);
        if (input.rooms.length > 0) {
            setExpand(true);
        }
    }, [input]);

    // Measure heights of header and content
    useLayoutEffect(() => {
        const measureHeights = () => {
            const header = headerRef.current;
            const content = contentRef.current;

            if (header) {
                setHeaderHeight(header.offsetHeight + 40); // Add padding/margin as needed
            }

            if (content) {
                setContentHeight(content.offsetHeight + 20);
            }
        };

        measureHeights(); // Measure initially
        window.addEventListener("resize", measureHeights);

        return () => window.removeEventListener("resize", measureHeights);
    }, [data.rooms, expand]); // Recalculate when rooms or expand state changes



    const showModalConfirm = (data: Room) => {
        let content = <></>

        if (data.cleanliness == ROOM_CLEANLINESS.DIRTY) {
            content = <DialogContent
                icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconBroom /></p>}
                title="Dọn phòng?"
                content={<p><span>chuyển trạng thái phòng {data.name} sang </span> <b className="text-base">sạch</b></p>}
                btnConfirm={<Button color="danger" variant="solid">Đồng ý</Button>}
            // onConfirm={() => }
            />

        } else {
            content = <DialogContent
                icon={<p className="p-3 bg-blue-100 w-fit rounded-full text-center"><IconStars /></p>}
                title="Chưa dọn phòng phòng?"
                content={<p><span>chuyển trạng thái phòng {data.name} sang </span><b className="text-base">chưa dọn</b></p>}
                btnConfirm={<Button color="blue" variant="solid">Đồng ý</Button>}
            // onConfirm={() => }
            />
        }

        setDialog({ ...dialog, open: true, content: content })
    }



    const Header = () => {


        const MultiSelectBtnGroup = (
            <div className="flex items-center gap-2">
                <Button variant="outlined" onClick={() => {
                    setMSelectionEnabled(false)
                    setData({ ...data, rooms: data.rooms.map(room => ({...room, select: false}))});
                }}>
                    <div className="flex items-center gap-2">
                        <b>Huỷ chọn ({data.rooms.filter((room) => room.select == true).length})</b>
                        <IconPlusCircle className="w-4 h-4  font-bold" />
                    </div>
                </Button>

                <Button variant="outlined" color="blue">
                    <div className="flex items-center gap-2">
                        <b>Chưa dọn</b>
                        <IconPlusCircle className="w-4 h-4 font-bold" />
                    </div>
                </Button>

                <Button type="primary"><b>Làm sạch</b></Button>
            </div>
        )

        const DropdownMenu = (
            <Dropdown
                menu={{
                    items,
                    onClick: (e) => {
                        switch (e.key) {
                            case "0":
                                onEdit && onEdit(data)
                                break;

                            case "1":
                                setMSelectionEnabled(true)
                                break;

                            case "3":
                                onDelete && onDelete(data)
                                break;


                            default:
                                break;
                        }
                    },
                }}
                trigger={["click"]}
            >
                <Button
                    icon={<IconThreedots />}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                />
            </Dropdown>
        )

        return (
            <div
                className="flex justify-between items-center"
                id="header"
                ref={headerRef}
            >
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setExpand(!expand)}
                        style={{
                            transform: expand ? "rotate(0deg)" : "rotate(-90deg)",
                            transition: "transform 0.3s ease",
                        }}
                    >
                        <IconCaretDownFill />
                    </button>
                    <p className="text-base font-semibold">{`${data.name} (${data.rooms.length ?? 0})`}</p>
                </div>

                {selectionEnabled ? MultiSelectBtnGroup : DropdownMenu}
            </div>
        )
    }


    return (
        <>
            <div
                className="panel overflow-hidden transition-all duration-300 space-y-5"
                style={{
                    height: expand ? headerHeight + contentHeight : headerHeight,
                }}
            >
                <Header/>

                <div
                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 transition-all duration-300`}
                    id="content"
                    ref={contentRef}
                >
                    {data.rooms.map((room) => (
                        <AreaCard key={room.id} data={room}
                            selectionEnabled={selectionEnabled}
                            onConfirm={() => showModalConfirm(room)}
                            onSelect={(value:Room) =>{
                                setData({ ...data,rooms: data.rooms.map(room => room.id === value.id ? value : room) })
                            }}
                        />
                    ))}
                </div>
            </div>

            <Modal
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
            >
                {dialog.content ?? <></>}
            </Modal>
        </>

    );
};

const items: MenuProps["items"] = [
    {
        label: "Đổi tên",
        icon: <IconPencil />,
        key: "0",
    },
    {
        label: " Chọn nhanh",
        icon: <IconCheckSquare />,
        key: "1",
    },
    {
        label: <span className="text-red-500">Xoá khu vực/tầng</span>,
        key: "3",
        icon: <IconTrash />,
    },
];