import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

// 字符串字面量代替枚举类型
type MenuMode = "horizontal" | "vertical";

// 定义menu的属性
export interface MenuItemProps {
    index: number;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { className, index, disabled, style,  children } = props;
    const consumerContext = useContext(MenuContext)
    // 添加class
    const classes = classNames("menu-item", className, {
        'is-disabled': disabled,
        'is-active': consumerContext.index === index
    });
    const handleClick = () => {
        consumerContext.onSelect && !disabled && consumerContext.onSelect(index);
    }
    return <li
        className={classes}
        style={style}
        onClick={ handleClick }
    >
        {children}
    </li>
}
MenuItem.defaultProps = {
    index: 0,
}

export default MenuItem;