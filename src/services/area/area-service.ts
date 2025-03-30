import { Area } from "../../models/area/area";
import { RoomType } from "../../models/room-type/room-type";
import { BaseResponse } from "../base-response";
import axiosClient, { VERSION } from "../configURL";

export const areaService = {
    List: async () => {
        try {
            const { data } = await axiosClient().get<BaseResponse<Area[]>>(
                `${VERSION}/area`
            );
            return data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Create: async (area: Area) => {
        try {
            const { data } = await axiosClient().post<BaseResponse<Area>>(`${VERSION}/area`,
                {
                    name: area.name,
                    description: area.description,
            
                }
            );
            return data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Update: async (area: Area) => {
        try {
            const { data } = await axiosClient().patch<BaseResponse<Area>>(`${VERSION}/area/${area.id}`,
                {
                 
                    name: area.name,
                    description: area.description,
            
                }
            );
            return data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },

    Delete: async (id: number) => {
        try {
            const { data } = await axiosClient().delete<BaseResponse<undefined>>(`${VERSION}/area/${id}`);
            return data;
        } catch (error: any) {
            console.log(error);
            return error.response.data;
            // throw error; // Re-throw the error to allow the caller to handle it if needed
        }
    },
};
