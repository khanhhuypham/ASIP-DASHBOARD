import { RoomType } from "../../models/room-type/room-type"
import { BaseResponse } from "../base-response"
import axiosClient, { VERSION } from "../configURL"


export const roomTypeService = {

    
    List: async () => {
        const {data} = await axiosClient().get<BaseResponse<RoomType[]>>(`${VERSION}/room-type`)
        return data
    },

    Create: async (type:RoomType) => {
        const {data} = await axiosClient().post<BaseResponse<RoomType>>(`${VERSION}/room-type`,{
            avatar: [],
            code:"",
            name:type.name,
            price:type.price,
            status:type.status,
            description: type.description
        })
        return data
    },

    Update: async (type:RoomType) => {
        const {data} = await axiosClient().patch<BaseResponse<RoomType>>(`${VERSION}/room-type/${type.id}`,{
            images: type.images,
            name:type.name,
            price:type.price,
            status:type.status,
            description: type.description,
            roomIds: type.room.map((r) => r.id)
        })
        return data
    },
    
    Delete: async (type:RoomType) => {
        const {data} = await axiosClient().delete<BaseResponse<undefined>>(`${VERSION}/room-type/${type.id}`)
        return data
    },
    
      
} 