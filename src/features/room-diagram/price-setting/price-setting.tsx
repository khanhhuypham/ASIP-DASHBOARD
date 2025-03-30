import { Button, Input, message, Modal } from "antd";

import { useEffect, useState } from "react";
import { Order } from "../../../models/order/order";
import { PopupInterface } from "../../../constants/popup-interface";
import { tab_filter_id } from "../../../constants/tag-id";
import { PAGE_SIZES } from "../../../constants/status";
import { OrderListProps } from "../../order/order-management";
import { PriceSettingTable } from "./component/table/price-setting-table";
import IconPeople from "../../../components/icons/icon-people";
import IconLocation from "../../../components/icons/icon-location";
import IconCalendar from "../../../components/icons/icon-calendar";
import IconPencil from "../../../components/icons/icon-pencil";
import { AddPrice } from "./component/add-price/add-price";
import { DialogContent } from "../../../components/custom/dialog-content";
import IconTrash from "../../../components/icons/icon-trash";
import { AddRoomType } from "./component/add-room-type/add-room-type";
import { Price } from "../../../models/price/price";
import { priceService } from "../../../services/price/price-service";


export const PriceSetting = () => {
    const [parameter, setParameter] = useState<OrderListProps>({
        data: [
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order(),
            new Order()
        ],
        loading: false,
        limit: PAGE_SIZES[0],
        page: 1,
        total_record: 1000,
        search_key: "",

    });
    const [priceList, setPriceList] = useState<Price[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<Price>(new Price());
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    // const debounceValue = useDebounce(parameter.search_key ?? "", 800);


    const showModalAddPrice = (data: Price) => {
        let component = <AddPrice data={data} onComplete={() =>{
                getPriceList()
                setDialog({ ...dialog, open: false })
            }}
        />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showModalAddRoomType = () => {
        let component = <AddRoomType />
        setDialog({ ...dialog, open: true, content: component })
    }

    const showDetailModal = (data: Order) => {
        // let component = <RoomAndAssociationDetail />
        // setDialog({ ...dialog, open: true, content: component })
    }

    const showModalConfirm = (data: Order) => {
        let content = <DialogContent 
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconTrash/></p>}
            title="Xoá bảng giá?"
            content="Bạn có chắc chắn muốn xoá bảng giá này?"
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
        />
        setDialog({ ...dialog, open: true, content: content })
    }



    const getPriceList = () => {
        priceService.List().then((res) => {
            if (res.status == 200) {
          
                setPriceList(res.data)
              
            } else {
                message.error(res.message)
            }
        })
    }

    useEffect(()=>{
        getPriceList()
    },[])



    const PriceCard = ({ data }: { data: Price }) => {
        return (

            <>
                <button className={`flex justfy-between items-center w-full p-2 rounded-lg ${data.select ? "bg-blue-100" : ""}`}
                
                    onClick={(e) => {
                        setSelectedPrice(data)
                    }}
                >
                    <div className="flex-1 space-y-1">
                        <p className="text-xs text-gray-500">{data.code}</p>
                        <p className={`text-base font-semibold ${data.select ? "text-blue-600" : "text-black"}`}>{data.name}</p>
                    </div>
                    <Button
                        type="text"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            showModalAddPrice(data)
                        }}
                    ><IconPencil className="w-[20px] h-[20px]"/></Button>
                </button>
                <hr/>
            </>

        )
    };



    return (
        <div>
            <div className="flex justify-between gap-4">

                <div className="panel w-[280px]">
                    <p className="text-lg font-semibold">Danh sách Bảng giá (3)</p>
                    <div className="space-y-4">
                        {
                            priceList.map((p) => <PriceCard data={p}/>)
                        }
               
                        <Button color="blue" variant="outlined" className="w-full" onClick={() => showModalAddPrice(new Price())}>+ Thêm bảng giá</Button>
                    </div>
                </div>

                <div className="panel space-y-6 flex-1 overflow-auto">
      
                    <PriceSettingTable
                        data={parameter.data}
                        page={parameter.page}
                        limit={parameter.limit}
                        total_record={parameter.total_record}
                        loading={parameter.loading}
                        onPageChange={(page) => {
                            setParameter({ ...parameter, page });
                        }}
                        // onEdit={(value) => showModalCreate(value)}
                        onChangeStatus={(value) => showModalConfirm(value)}
                        onShowDetail={(value) => showDetailModal(value)}
                    />
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
        </div>
    );
}