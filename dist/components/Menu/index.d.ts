import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
declare type composeProps = typeof Menu & {
    MenuItem: typeof MenuItem;
    SubMenu: typeof SubMenu;
};
declare const ComposeMenu: composeProps;
export default ComposeMenu;
