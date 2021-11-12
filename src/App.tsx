import React from 'react';
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0'  mode="vertical" defaultOpenSubMenus={["1"]} onSelect={(s)=>console.log(s)}>
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
