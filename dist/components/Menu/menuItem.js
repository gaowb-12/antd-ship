import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
var MenuItem = function (props) {
    var className = props.className, index = props.index, disabled = props.disabled, style = props.style, children = props.children;
    var consumerContext = useContext(MenuContext);
    // 添加class
    var classes = classNames("menu-item", className, {
        'is-disabled': disabled,
        'is-active': consumerContext.index === index
    });
    var handleClick = function () {
        consumerContext.onSelect && !disabled && typeof index === "string" && consumerContext.onSelect(index);
    };
    return React.createElement("li", { className: classes, style: style, onClick: handleClick }, children);
};
// 设置默认属性
MenuItem.defaultProps = {
    index: '0',
};
// 给当前组件起名字
MenuItem.displayName = "MenuItem";
export default MenuItem;
