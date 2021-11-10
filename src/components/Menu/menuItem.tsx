import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

// 定义menu的属性
export interface MenuItemProps {
    index?: string;
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
        consumerContext.onSelect && !disabled && typeof index === "string"&& consumerContext.onSelect(index);
    }
    return <li
        className={classes}
        style={style}
        onClick={ handleClick }
    >
        {children}
    </li>
}
// 设置默认属性
MenuItem.defaultProps = {
    index: '0',
}
// 给当前组件起名字
MenuItem.displayName = "MenuItem";

export default MenuItem;