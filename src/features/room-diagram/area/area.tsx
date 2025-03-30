import { Button, Input, message, Modal } from "antd";
import { AreaCard } from "./component/area-card";
import { Storey } from "./component/storey";
import { PopupInterface } from "../../../constants/popup-interface";
import { useEffect, useState } from "react";
import { Area } from "../../../models/area/area";
import { areaService } from "../../../services/area/area-service";
import { CreateArea } from "./component/edit-area";
import { DialogContent } from "../../../components/custom/dialog-content";
import IconTrash from "../../../components/icons/icon-trash";


export const AreaPage = () => {
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const [data, setData] = useState<Area[]>([])
    const [fullData, setFullData] = useState<Area[]>([])

    const getArea = () => {
        areaService.List().then((res) => {
            if (res.status == 200) {
                // setParameter({ ...parameter, data: res.data });
                // setData(res.data.filter((item) => item.status == status))
                setData(res.data)
                setFullData(res.data)
            } else {
                message.error(res.message)
            }
        })
    }

    const deleteArea = (data:Area) => {
        areaService.Delete(data.id).then((res) => {
            if (res.status == 200) {
                getArea()
            } else {
                message.error(res.message)
            }
        })
    }

    const showModalCreate = (data: Area) => {
        let content = <CreateArea data={data} onComplete={(value: Area) => {
            getArea()
            setDialog({ ...dialog, open: false })
        }} />
        setDialog({ ...dialog, open: true, content: content })
    }


    const showModalConfirm = (data: Area) => {
        let content = <DialogContent
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash /></p>}
            title={`Xoá khu vực/tầng ${data.name}?`}
            content="Bạn có chắc chắn muốn xoá khu vực/tầng này không"
            btnConfirm={
                <Button color="danger" variant="solid"
                    onClick={() => {
                        deleteArea(data)
                        setDialog({ ...dialog, open: false })
                    }}
                >Xác nhận</Button>
            }
        />

        setDialog({ ...dialog, open: true, content: content })
    }



    useEffect(() => {
        getArea()
    }, []);


    const Header = () => {
        return (
            <div className="panel">

                <div className="flex justify-between">
                    <span className="text-lg font-semibold">Khu vực/Tầng ({data.length})</span>
                    <Button type="primary" onClick={() => showModalCreate(new Area())}>+ Thêm tầng/khu vực</Button>
                </div>
                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm phòng, khu vực"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => {
                        }}
                    />

                    <div className="flex justify-between gap-3">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-purple-600" />
                            <span className="text-sm">Phòng trống(11)</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-purple-600" />
                            <span className="text-sm">Đang sử dụng(11)</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="form-checkbox rounded-[3px] h-4 w-4 border-cyan-200" />
                            <span className="text-sm">Sắp nhận(11)</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    };


    return (
        <>
            <div className="space-y-4">
                <Header />

                {
                    data.map((area) => {
                        return (
                            <Storey 
                                input={area} 
                                onEdit={(value:Area) => showModalCreate(value)}
                                onDelete={(value:Area) => showModalConfirm(value)}
                            />
                        )
                    })
                }

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

    )
}