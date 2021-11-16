import React, { useState, createContext } from "react";
import classNames from "classnames";
export var MenuContext = createContext({ index: "0" });
var Menu = function (props) {
    var className = props.className, defaultIndex = props.defaultIndex, mode = props.mode, style = props.style, onSelect = props.onSelect, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setCurrentActive = _a[1];
    // 添加class
    var classes = classNames("antd-menu", className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setCurrentActive(index);
        onSelect && onSelect(index);
    };
    // context属性类型
    var passedContext = {
        index: currentActive || "0",
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
        onSelect: handleClick
    };
    // 渲染MenuItem子组件，判断传入其他组件时的逻辑
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            // 类型断言，因为child默认是ReactNode类型，只能是FunctionComponentElement类型
            var childElement = child;
            // 获取组件的名字
            var displayName = childElement.type.displayName;
            // 判断是否是MenuItem
            if (displayName === 'MenuItem' || displayName === 'subMenu')
                // 通过cloneElement方法，克隆节点，目的是传入默认的index属性
                return React.cloneElement(childElement, {
                    index: String(index)
                });
            else
                console.error("warning：Not MenuItem！");
        });
    };
    return React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren()));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "vertical",
    defaultOpenSubMenus: []
};
export default Menu;
