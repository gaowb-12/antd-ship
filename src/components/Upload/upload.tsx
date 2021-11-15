import React, {useRef,useState} from "react";
import axios from "axios";
import Button from "../Button/button"
import UploadList from "./uploadList"

export type UploadFileStatus = "ready"|"success"|"uploading"|"error"
export interface UploadFile{
    uid:string;
    size:number;
    name:string;
    status?:UploadFileStatus;
    percent?:number;
    raw?:File;
    response?:any;
    error?:any;
}

export interface UploadProps{
    action:string;
    defaultFileList:UploadFile[];
    children:React.ReactNode;
    beforeUpload?:(file:File)=>boolean | Promise<File>;
    onProgress?:(percentage:number, file:File) => void;
    onSuccess?:(data:any, file:File)=>void;
    onError?:(err:any, file:File)=>void;
    onRemove?:(file:UploadFile)=>void;
    onChange?:(file:File) => void;
}

export const Upload:React.FC<UploadProps> = (props) => {
    const {
        defaultFileList,action,beforeUpload,onProgress,onSuccess,onError,onRemove,onChange
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
    const updateFileList = (uploadFile:UploadFile, updateObj: Partial<UploadFile>)=>{
        setFileList(prevList => {
            return prevList.map(file => {
                if(file.uid === uploadFile.uid){
                    return { ...file, ...updateObj }
                }else {
                    return file
                }
            })
        })
    }

    const handleClick = () => {
        if(inputRef.current){
            inputRef.current.click()
        }
    }
    const handleRemove = (file:UploadFile)=>{
        setFileList(prevList=>{
            return prevList.filter(item => file.uid !== item.uid)
        });
        if(onRemove) onRemove(file);
    }
    // 上传文件方法
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if(!beforeUpload) post(file);
            else{
                const result = beforeUpload(file);
                if(result && result instanceof Promise){
                    result.then(processFile => {
                        post(file);
                    })
                }else if(result !== false) {
                    post(file);
                }
            }
        });
    }
    const post = (file:File) => {
        let _file: UploadFile = {
            uid:Date.now() + "",
            status:"ready",
            name:file.name,
            size:file.size,
            percent:0,
            raw:file
        };
        setFileList([_file, ...fileList]);

        const formData = new FormData();
        formData.append(file.name, file);
        axios.post(action, formData, {
            headers:{
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress:(e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if(percentage<100){
                    updateFileList(_file, {
                        percent: percentage,
                        status:"uploading"
                    });
                    if(onProgress){
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(res => {
            if(onChange) onChange(file);
            if(onSuccess) onSuccess(res.data, file);
            updateFileList(_file, {
                response:res.data,
                status:"success"
            });
        }).catch(err => {
            if(onChange) onChange(file);
            if(onError) onError(err, file);
            updateFileList(_file, {
                error:err,
                status:"error"
            });
        });
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) return ;
        uploadFiles(files);
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }

    return <div
        className="antd-upload-component"
    >
        <Button btnType='primary' onClick={handleClick}>上传文件</Button>
        <input 
        ref={inputRef} 
        type="file" 
        className="antd-file-input" 
        style={{display:"none"}} 
        onChange={handleInputChange}
        />
        <UploadList 
            fileList={fileList}
            onRemove = {handleRemove}
        />
    </div>
}
export default Upload;