

import { User } from "../../models/user"
import { BaseResponse } from "../base-response"
import axiosClient, { VERSION } from "../configURL"


export const authService = {

    
    Login: async (username:string,password:string) => {
        const {data} = await axiosClient(1233).post<BaseResponse<User>>(`${VERSION}/auth/login`,{
            username,
            password
        })
        return data
    },
    
      
} 