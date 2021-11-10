import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem"

// 字符串字面量代替枚举类型
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectIndex: string) => void;
// 定义menu的属性
export interface MenuProps {
    defaultIndex?: string;
    defaultOpenSubMenus?: string[];
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

// 定义context传递的属性类型
interface IMenuContext {
    index:string;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    onSelect?: SelectCallback;
}
export const MenuContext = createContext<IMenuContext>({ index:"0" });

const Menu: React.FC<MenuProps> = (props) => {
    const { className, defaultIndex, mode, style, onSelect, children, defaultOpenSubMenus } = props;
    const [ currentActive, setCurrentActive ] = useState(defaultIndex);
    // 添加class
    const classes = classNames("antd-menu", className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    const handleClick = (index: string) => {
        setCurrentActive(index);
        onSelect && onSelect(index);
    };
    // context属性类型
    const passedContext: IMenuContext = {
        index: currentActive || "0",
        mode,
        defaultOpenSubMenus,
        onSelect: handleClick
    };
    // 渲染MenuItem子组件，判断传入其他组件时的逻辑
    const renderChildren = () =>{
        return React.Children.map(children, (child, index) => {
            // 类型断言，因为child默认是ReactNode类型，只能是FunctionComponentElement类型
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            // 获取组件的名字
            const { displayName } = childElement.type;
            // 判断是否是MenuItem
            if(displayName ==='MenuItem' || displayName === 'subMenu')
                // 通过cloneElement方法，克隆节点，目的是传入默认的index属性
                return React.cloneElement(childElement, {
                    index: String(index)
                });
            else
                console.error("warning：Not MenuItem！");
        });
    }
    return <ul
        className={classes}
        style={style}
        data-testid="test-menu"
    >
        <MenuContext.Provider value={passedContext}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
}
Menu.defaultProps = {
    defaultIndex: "0",
    mode:"vertical",
    defaultOpenSubMenus:[]
}

export default Menu;