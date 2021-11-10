import React from 'react';
import Button, { ButtonType, ButtonSize} from "./components/Button/button";
import Menu, { MenuProps} from "./components/Menu/menu";
import MenuItem, { MenuItemProps } from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Small} href="http://www.baidu.com" target="_blank">Hello</Button>

        <Menu defaultIndex={0} onSelect={(index)=>{alert(index)}}>
          <MenuItem index={0}>
            cool Link
          </MenuItem>
          <MenuItem index={1} disabled>
            cool Link1
          </MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
