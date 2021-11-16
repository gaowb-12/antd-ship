import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
var ComposeMenu = Menu;
ComposeMenu.MenuItem = MenuItem;
ComposeMenu.SubMenu = SubMenu;
export default ComposeMenu;
