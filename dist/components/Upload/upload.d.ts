import React from "react";
export declare type UploadFileStatus = "ready" | "success" | "uploading" | "error";
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList: UploadFile[];
    children: React.ReactNode;
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onRemove?: (file: UploadFile) => void;
    onChange?: (file: File) => void;
}
export declare const Upload: React.FC<UploadProps>;
export default Upload;
