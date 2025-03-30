import axios, { AxiosError } from "axios";
import { GuestListPageProps } from "../../features/guest/guest-list/customer-management";
import { Guest } from "../../models/guest/guest";
import { BaseResponse, Pagination } from "../base-response";
import axiosClient, { VERSION } from "../configURL";

export const guestService = {
    List: async (param: GuestListPageProps) => {
        const { data } = await axiosClient().get<BaseResponse<Pagination<Guest[]>>>(`${VERSION}/guest`, {
            params: { ...param },
        });       
        return data 
    },


    Create: async (guest: Guest) => {
        try {
            const response = await axiosClient().post<BaseResponse<Guest>>(
                `${VERSION}/guest`,
                {
                    code:guest.code,
                    name: guest.name,
                    avatar: guest.avatar,
                    email: guest.email,
                    DOB:guest.DOB,
                    gender: guest.gender,
                    phone: guest.phone,
                    guest_type: guest.guest_type,
                    guest_group_id: guest.guest_group.id,
                    description: guest.description,
                }
            );
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    },

    Update: async (guest: Guest) => {
        const {data} = await axiosClient().patch<BaseResponse<Guest>>(`${VERSION}/guest/${guest.id}`,
            {
                code:guest.code,
                name: guest.name,
                avatar: guest.avatar,
                email: guest.email,
                gender: guest.gender,
                phone: guest.phone,
                DOB:guest.DOB,
                guest_type: guest.guest_type,
                guest_group_id: guest.guest_group.id,
                description: guest.description,
            }
        );
        return data;
    },

    Delete: async (guest: Guest) => {
        try {
            const response = await axiosClient().delete<
                BaseResponse<undefined>
            >(`${VERSION}/guest/${guest.id}`);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    },
};
