import React from 'react';
import Button, { ButtonType, ButtonSize} from "./components/Button/button";
import Menu, { MenuProps} from "./components/Menu/menu";
import MenuItem, { MenuItemProps } from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faCoffee} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Menu defaultIndex='0'  mode="horizontal" defaultOpenSubMenus={["1"]} onSelect={(s)=>console.log(s)}>
          <MenuItem>
            cool Link
          </MenuItem>
          <SubMenu title="test">
            <MenuItem>
              SubMenu cool Link1
            </MenuItem>
            <MenuItem>
              SubMenu cool Link2
            </MenuItem>
          </SubMenu>
          <MenuItem disabled>
            cool Link2
          </MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
