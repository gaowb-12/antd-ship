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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
export var Input = function (props) {
    var _a;
    // 取出各种属性
    var disabled = props.disabled, size = props.size, className = props.className, icon = props.icon, prepend = props.prepend, append = props.append, children = props.children, style = props.style, placeholder = props.placeholder, inputRef = props.inputRef, onIconClick = props.onIconClick, onChange = props.onChange, restProps = __rest(props, ["disabled", "size", "className", "icon", "prepend", "append", "children", "style", "placeholder", "inputRef", "onIconClick", "onChange"]);
    // 根据属性计算classname
    var classes = classNames("antd-input-wrapper", className, (_a = {
            'is-disabled': disabled
        },
        _a["input-size-" + size] = size,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = append,
        _a['input-group-prepend'] = prepend,
        _a));
    // 根据属性判断返回不同的节点
    return React.createElement("div", { className: classes, style: style },
        prepend && React.createElement("div", { className: "antd-input-group-prepend" }, prepend),
        icon && React.createElement("div", { className: "icon-wrapper", onClick: onIconClick },
            React.createElement(Icon, { icon: icon })),
        React.createElement("input", __assign({ placeholder: placeholder, onChange: onChange, className: "antd-input-inner", ref: inputRef, disabled: disabled }, restProps)),
        children,
        append && React.createElement("div", { className: "antd-input-group-append" }, append));
};
Input.defaultProps = {
    placeholder: "请输入内容",
    disabled: false,
    size: "lg"
};
export default Input;
