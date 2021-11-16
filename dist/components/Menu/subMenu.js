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
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from '../Icon/icon';
import Transition from "../Transition/transition";
var SubMenu = function (props) {
    var className = props.className, index = props.index, title = props.title, style = props.style, children = props.children;
    var consumerContext = useContext(MenuContext);
    var openSubMenus = consumerContext.defaultOpenSubMenus;
    var isOpened = (index && consumerContext.mode === 'vertical') ? openSubMenus.includes(index) : false;
    var _a = useState(isOpened), menuOpen = _a[0], setOpen = _a[1];
    // 添加class
    var classes = classNames("menu-item submenu-item", className, {
        'is-active': consumerContext.index === index,
        'is-opened': menuOpen,
        'is-vertical': consumerContext.mode === 'vertical'
    });
    // 横向菜单鼠标经过事件，竖向菜单点击事件
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer = null;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = consumerContext.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var mouseEvents = consumerContext.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    // 渲染MenuItem子组件，判断传入其他组件时的逻辑
    var renderChildren = function () {
        var subMenuClasses = classNames('antd-submenu', {
            'menu-opened': menuOpen
        });
        var element = React.Children.map(children, function (child, i) {
            // 类型断言，因为child默认是ReactNode类型，只能是FunctionComponentElement类型
            var childElement = child;
            // 获取组件的名字
            var displayName = childElement.type.displayName;
            // 判断是否是MenuItem
            if (displayName === 'MenuItem')
                // 通过cloneElement方法，克隆节点，目的是传入默认的index属性
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            else
                console.error("warning：Not MenuItem！");
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, element)));
    };
    return React.createElement("li", __assign({ key: index, className: classes, style: style }, mouseEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: "arrow-icon" })),
        renderChildren());
};
// 给当前组件起名字
SubMenu.displayName = "subMenu";
export default SubMenu;
