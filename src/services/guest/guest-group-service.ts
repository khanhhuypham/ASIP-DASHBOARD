import { GuestGroup } from "../../models/guest/guest-group"
import { BaseResponse } from "../base-response"
import axiosClient, { VERSION } from "../configURL"



export const guestGroupService = {

    
    List: async () => {

        try {
            const response = await axiosClient().get<BaseResponse<GuestGroup[]>>(`${VERSION}/guest-group`)

            return response.data;
        } catch (error: any) {
           
            return error.response.data;
           
        }

    },

    Create: async (group:GuestGroup) => {

        try {
            const response =  await axiosClient().post<BaseResponse<GuestGroup>>(`${VERSION}/guest-group`,{
                name:group.name,
                description:group.description
            })
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }

    },

    Update: async (group:GuestGroup) => {

        try {
            const response = await axiosClient().patch<BaseResponse<GuestGroup>>(`${VERSION}/guest-group/${group.id}`,{
                name:group.name,
                description:group.description
            })
            return response.data;
        } catch (error: any) {
            return error.response.data;   
        }

    },
    
    Delete: async (group:GuestGroup) => {

        try {
            const response = await axiosClient().delete<BaseResponse<undefined>>(`${VERSION}/guest-group/${group.id}`)
            return response.data;
        } catch (error: any) {
            return error.response.data;
            
        }
     
    },
    
      
} 
      
