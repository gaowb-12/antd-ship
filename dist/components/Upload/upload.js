var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/button";
import UploadList from "./uploadList";
export var Upload = function (props) {
    var defaultFileList = props.defaultFileList, action = props.action, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onRemove = props.onRemove, onChange = props.onChange;
    var inputRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (uploadFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === uploadFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return file.uid !== item.uid; });
        });
        if (onRemove)
            onRemove(file);
    };
    // 上传文件方法
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload)
                post(file);
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processFile) {
                        post(file);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + "",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList(__spreadArray([_file], fileList, true));
        var formData = new FormData();
        formData.append(file.name, file);
        axios.post(action, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, {
                        percent: percentage,
                        status: "uploading"
                    });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (res) {
            if (onChange)
                onChange(file);
            if (onSuccess)
                onSuccess(res.data, file);
            updateFileList(_file, {
                response: res.data,
                status: "success"
            });
        }).catch(function (err) {
            if (onChange)
                onChange(file);
            if (onError)
                onError(err, file);
            updateFileList(_file, {
                error: err,
                status: "error"
            });
        });
    };
    var handleInputChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };
    return React.createElement("div", { className: "antd-upload-component" },
        React.createElement(Button, { btnType: 'primary', onClick: handleClick }, "\u4E0A\u4F20\u6587\u4EF6"),
        React.createElement("input", { ref: inputRef, type: "file", className: "antd-file-input", style: { display: "none" }, onChange: handleInputChange }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove }));
};
export default Upload;
