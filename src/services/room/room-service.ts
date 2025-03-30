import { message } from "antd";
import { RoomListProps } from "../../features/room-diagram/room-and-association/room-and-association";
import { Room } from "../../models/room/room";
import { BaseResponse, Pagination } from "../base-response";
import axiosClient, { VERSION } from "../configURL";

export const roomService = {
    List: async (param: RoomListProps) => {
        try {
            const response = await axiosClient().get(`${VERSION}/room`, {
                params: {
                    limit: param.limit,
                    page: param.page,
                    search_key: param.search_key,
                    active: param.active,
                },
            });

            return response.data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Create: async (data: Room) => {
        try {
            const response = await axiosClient().post(`${VERSION}/room`, {
                images:data.images,
                name: data.name,
                total_guests: 0,
                room_type_id: data.room_type.id,
                area_id: data.area.id,
                description:data.description,
                equipment_id: [],
            });

            return response.data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Update: async (data: Room) => {
        try {
            const response = await axiosClient().patch(`${VERSION}/room/${data.id}`, {
                images:data.images,
                name: data.name,
                total_guests: 0,
                room_type_id: data.room_type.id,
                area_id: data.area.id,
                description:data.description,
                equipment_id: [],
            });

            return response.data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },
};
