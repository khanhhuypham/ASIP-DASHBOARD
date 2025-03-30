import { useState } from "react";
import axios from "axios";
import { ApiConfig } from "../services/api-config";
import { BaseResponse } from "../services/base-response";
import CookieUtils from "../utils/cookie-utils";

const useUpload = <T>(
    uploadUrl: string,
    projectId = ApiConfig.PROJECT_ID.USER_SERVICE
) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [baseResponse, setBaseResponse] = useState<BaseResponse<T>>();
    const finalToken = CookieUtils.getCurrentUser().access_token ?? "";

    const uploadFiles = async (files: FileList) => {
        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);

        // Create a new FormData object and append each file
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file); // Append files array to the form
        });

        try {
            // Upload files via axios
            const response = await axios.post(
                `${ApiConfig.API_URL}/api/${uploadUrl}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        ...(finalToken && {
                            Authorization: `Bearer ${finalToken}`,
                        }),
                        ...(projectId && { ProjectId: projectId }),
                    },
                    onUploadProgress: (progressEvent) => {
                        const total = progressEvent.total ?? 1;
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / total
                        );
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            // If upload is successful, reset progress
            setBaseResponse(response.data);
            setIsUploading(false);
            setUploadProgress(100);
        } catch (error: unknown) {
            setIsUploading(false);
            let errorMessage = "";
            if (axios.isCancel(error)) {
                console.error("Request cancelled", error.message);
                errorMessage = error.message ?? "Request cancelled";
            } else {
                errorMessage =
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred";
            }
            setUploadError(errorMessage);
        }
    };

    return {
        baseResponse,
        uploadFiles,
        isUploading,
        uploadProgress,
        uploadError,
    };
};

export default useUpload;
