import React from "react";
import Icon from '../Icon/icon';
export var UploadList = function (_a) {
    var fileList = _a.fileList, onRemove = _a.onRemove;
    return (React.createElement("ul", { className: "antd-upload-list" }, fileList && fileList.map(function (item) {
        return React.createElement("li", { className: "antd-upload-list-item", key: item.uid },
            React.createElement("span", { className: "file-name file-name-" + item.status },
                React.createElement(Icon, { icon: "file-alt" }),
                item.name),
            React.createElement("span", { className: "file-status" },
                item.status === "uploading" &&
                    React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" }),
                item.status === "success" &&
                    React.createElement(Icon, { icon: "check-circle", theme: "success" }),
                item.status === "error" &&
                    React.createElement(Icon, { icon: "times-circle", theme: "danger" })),
            React.createElement("span", { className: "file-actions" },
                React.createElement(Icon, { icon: "times", onClick: function () { return onRemove(item); } })),
            item.status === 'uploading' && (item.percent || 0)
        // <Progress percent={item.percent || 0} />
        );
    })));
};
export default UploadList;
