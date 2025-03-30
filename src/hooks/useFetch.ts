import axios from "axios";
import { useState } from "react";
import { ApiConfig } from "../services/api-config";
import { BaseResponse, HttpMethod } from "../services/base-response";
import { useExpired } from "../state/expired-context";
import { useLoading } from "../state/loading-context";
import CookieUtils from "../utils/cookie-utils";

type FetchState = {
    loading: boolean;
    error: string | null;
}

const initialFetchState: FetchState = {
    loading: false,
    error: null,
}

interface UseFetchProps {
    endPointUrl?: string;
    showScreenLoading?: boolean;
    projectId?: number;
}

const useApi = <T>(
    method: HttpMethod,
    showLoading: boolean,
    projectId: number
) => {
    const [fetchState, setFetchState] = useState<FetchState>(initialFetchState);
    const [baseResponse, setBaseResponse] = useState<BaseResponse<T>>();
    const { setIsLoading } = useLoading();
    const { setExpired } = useExpired();

    
    const finalToken = CookieUtils.getCurrentUser().access_token ?? "";

    const axiosInstance = axios.create({
        baseURL: "",
        headers: {
            "content-type": "application/json",
            ...(finalToken && { Authorization: `Bearer ${finalToken}` }),
            ...(projectId && { ProjectId: projectId }),
        },
        responseType: "json",
        timeout: 15000,
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        },
        (error: unknown) => {
            return Promise.reject(
                error instanceof Error ? error : new Error(String(error))
            );
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: unknown) => {
            return Promise.reject(
                error instanceof Error ? error : new Error(String(error))
            );
        }
    );

    const request = async ({ endPoint = "", data = {} }) => {
        if (showLoading) setIsLoading(true);
        setFetchState({ loading: true, error: null });
        try {
            const response = await axiosInstance({
                url: `${ApiConfig.API_URL}/api/${endPoint}`,
                method: method,
                ...(method === HttpMethod.GET && { params: data }),
                ...(method === HttpMethod.POST && { data: data }),
            });
            setBaseResponse(response.data);
            setFetchState({ loading: false, error: null });
            if (response.status === 401 || response.data.status === 401)
                setExpired(true);
        } catch (error: unknown) {
            let errorMessage = "";
            if (axios.isCancel(error)) {
                console.error(
                    "Request cancelled",
                    error instanceof Error ? error.message : String(error)
                );
                errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Request cancelled";
            } else {
                errorMessage =
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred";
            }
            setFetchState({ loading: false, error: errorMessage });
        } finally {
            if (showLoading) setIsLoading(false);
        }
    };

    return { baseResponse, request, ...fetchState };
};
// Wrapper for cleaner method access
export const useFetchData = {
    Get: <T>({
        projectId = ApiConfig.PROJECT_ID.USER_SERVICE,
        showScreenLoading = false,
    }: UseFetchProps = {}) => {
        return useApi<T>(HttpMethod.GET, showScreenLoading, projectId);
    },
    Post: <T>({
        projectId = ApiConfig.PROJECT_ID.USER_SERVICE,
        showScreenLoading = false,
    }: UseFetchProps = {}) => {
        return useApi<T>(HttpMethod.POST, showScreenLoading, projectId);
    },
};
