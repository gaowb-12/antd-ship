import React, { useState, createContext } from "react";
import classNames from "classnames";

// 字符串字面量代替枚举类型
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectIndex: number) => void;
// 定义menu的属性
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

// 定义context传递的属性类型
interface IMenuContext {
    index:number;
    onSelect?: SelectCallback;
}
export const MenuContext = createContext<IMenuContext>({ index:0 });

const Menu: React.FC<MenuProps> = (props) => {
    const { className, defaultIndex, mode, style, onSelect, children } = props;
    const [ currentActive, setCurrentActive ] = useState(defaultIndex);
    // 添加class
    const classes = classNames("antd-menu", className, {
        'menu-vertical': mode === 'vertical'
    });
    const handleClick = (index: number) => {
        setCurrentActive(index);
        onSelect && onSelect(index);
    };
    const passedContext:IMenuContext = {
        index: currentActive || 0,
        onSelect: handleClick
    };

    return <ul
        className={classes}
        style={style}
    >
        <MenuContext.Provider value={passedContext}>
            {children}
        </MenuContext.Provider>
    </ul>
}
Menu.defaultProps = {
    defaultIndex: 0,
    mode: "horizontal"
}

export default Menu;