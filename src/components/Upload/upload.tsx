import React from "react";

interface UploadProps{
    action:string;
    children:React.ReactNode;
    beforeUpload:()=>void;
    onProgress:()=>void;
    onChange:()=>void;
    onSuccess:()=>void;
    onError:()=>void;
    onRemoved:()=>void;
}

export const Upload:React.FC = (props) => {
    return <></>
}
export default Upload;