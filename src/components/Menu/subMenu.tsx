import React, { useContext, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

// 定义menu的属性
export interface SubMenuProps {
    index?: string;
    title:string;
    className?: string;
    style?: React.CSSProperties;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { className, index, title, style,  children } = props;
    const consumerContext = useContext(MenuContext);
    const openSubMenus = consumerContext.defaultOpenSubMenus as Array<string>;
    const isOpened = (index && consumerContext.mode === 'vertical') ? openSubMenus.includes(index) : false;
    
    const [ menuOpen, setOpen] = useState(isOpened);
    // 添加class
    const classes = classNames("menu-item submenu-item", className, {
        'is-active': consumerContext.index === index
    });

    // 横向菜单鼠标经过事件，竖向菜单点击事件
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    let timer:any = null;
    const handleMouse = (e: React.MouseEvent, toggle:boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    }
    const clickEvents = consumerContext.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    const mouseEvents = consumerContext.mode !== 'vertical' ? {
        onMouseEnter: (e:React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e:React.MouseEvent) => { handleMouse(e, false) }
    } : {};

    // 渲染MenuItem子组件，判断传入其他组件时的逻辑
    const renderChildren = () =>{
        const subMenuClasses = classNames('antd-submenu', {
            'menu-opened':menuOpen
        });
        const element = React.Children.map(children, (child, i) => {
            // 类型断言，因为child默认是ReactNode类型，只能是FunctionComponentElement类型
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            // 获取组件的名字
            const { displayName } = childElement.type;
            // 判断是否是MenuItem
            if(displayName ==='MenuItem')
                // 通过cloneElement方法，克隆节点，目的是传入默认的index属性
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            else
                console.error("warning：Not MenuItem！");
        });
        return <ul className={subMenuClasses}>
            {element}
        </ul>
    }
    return <li
        key={index}
        className={classes}
        style={style}
        {...mouseEvents}
    >
        <div className="submenu-title" {...clickEvents}>
            {title}
        </div>
        {renderChildren()}
    </li>
}
// 设置默认属性
SubMenu.defaultProps = {
    index: '0',
}
// 给当前组件起名字
SubMenu.displayName = "subMenu";

export default SubMenu;