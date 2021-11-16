import React from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    defaultOpenSubMenus?: string[];
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}
interface IMenuContext {
    index: string;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    onSelect?: SelectCallback;
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
