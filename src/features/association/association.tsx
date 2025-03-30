import { useEffect, useState } from "react";
import AssociationFlatformCard from "./component/association-flatform-card/association-flatform-card";
import AssociationFlatformTable from "./component/association-flatform-table/association-flatform-table";
import { AddAssociationDrawer } from "./component/drawer/association-drawer";
import { PopupInterface } from "../../constants/popup-interface";
import { DialogContent } from "../../components/custom/dialog-content";
import { Button, Modal } from "antd";
import IconTrash from "../../components/icons/icon-trash";



const AssociationFlatform = () => {
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, title: "", content: undefined });

    const [open, setOpen] = useState(false);


    const showModalConfirm = () => {
        let content = <DialogContent
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash /></p>}
            title="Tạm ngưng kết nối tất cả lịch Airbnb?"
            content="Bạn có chắc chắn muốn tạm ngưng kết nối tất cả trên Airbnb? Trạng thái các phòng sẽ tạm thời ngắt kết nối trên nền tảng."
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
        />
        setDialog({ ...dialog, open: true, content: content })
    }

    return (
        <>
            <div className="flex gap-4">
                <div className="panel w-[350px]">
                    <p className="text-lg font-semibold">Danh sách nền tảng</p>
                    <div className="space-y-4">
                        {
                            Array.from({ length: 3 }, (_, i) => <AssociationFlatformCard
                                onDisconnect={() => showModalConfirm()}
                                onAddAssociation={() => setOpen(true)}
                            />)
                        }
                    </div>
                </div>
                <div className="w-full space-y-4">

                    {
                        Array.from({ length: 3 }, (_, i) => {
                            return (
                                <div className="panel">
                                    <AssociationFlatformTable />
                                </div>
                            )
                        })
                    }
                  
                </div>
            </div>
            <AddAssociationDrawer open={open} setOpen={(open: boolean) => {
                setOpen(open)
            }} />

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

export default AssociationFlatform;








