import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

type composeProps = typeof Menu & {
    MenuItem: typeof MenuItem,
    SubMenu: typeof SubMenu
}
const ComposeMenu = Menu as composeProps;

ComposeMenu.MenuItem = MenuItem;
ComposeMenu.SubMenu = SubMenu;

export default ComposeMenu;