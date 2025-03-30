import { message } from "antd";
import { RoomListProps } from "../../features/room-diagram/room-and-association/room-and-association";
import { Room } from "../../models/room/room";
import { BaseResponse, Pagination } from "../base-response";
import axiosClient, { VERSION } from "../configURL";
import { Price } from "../../models/price/price";

export const priceService = {
    List: async () => {
        try {
            const response = await axiosClient().get<BaseResponse<Price[]>>(`${VERSION}/price`, {
                params: {
                  
                },
            });

            return response.data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Create: async (data: Price) => {
        try {
            const response = await axiosClient().post<BaseResponse<undefined>>(`${VERSION}/price`, {
                code:data.code,
                name: data.name,
                valid_from: data.valid_from,
                valid_to: data.valid_to,
                note: data.note
            });

            return response.data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Update: async (data: Price) => {
        try {
            const response = await axiosClient().patch<BaseResponse<undefined>>(`${VERSION}/price/${data.id}`, {
                name: data.name,
                valid_from: data.valid_from,
                valid_to: data.valid_to,
                note: data.note
            });

            return response.data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Delete: async (data: Room) => {
        try {
            const response = await axiosClient().delete<BaseResponse<undefined>>(`${VERSION}/price/${data.id}`);

            return response.data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },
};
