import React from "react";
import {UploadFile} from "./upload";
import Icon from '../Icon/icon';
// import {Progress} from "../Progress/progress";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}
export const UploadList: React.FC<UploadListProps> = (
  {
    fileList, 
    onRemove
  }) => {

  return (
    <ul className="antd-upload-list">
      {fileList && fileList.map(item => {
        return <li 
                    className="antd-upload-list-item"
                    key={item.uid}
                >
                    <span className={`file-name file-name-${item.status}`}>
                        <Icon icon="file-alt" />
                        {item.name}
                    </span>
                    <span className="file-status">
                        {item.status === "uploading" &&
                        <Icon icon="spinner" spin theme="primary"/>}
                        {item.status === "success" &&
                        <Icon icon="check-circle" theme="success"/>}
                        {item.status === "error" &&
                        <Icon icon="times-circle" theme="danger"/>}
                    </span>
                    <span className="file-actions">
                        <Icon icon="times" onClick={() => onRemove(item)}/>
                    </span>
                    {item.status === 'uploading' && (item.percent || 0)
                        // <Progress percent={item.percent || 0} />
                    }
                </li>
      })}
    </ul>
  )
}
export default UploadList;