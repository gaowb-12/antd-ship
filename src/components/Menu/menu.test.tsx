import React from "react";
import { render, fireEvent, RenderResult, cleanup, waitFor } from "@testing-library/react";
import Menu, { MenuProps } from "./menu"
import MenuItem from "./menuItem"
import SubMenu from "./subMenu"

const testProps:MenuProps = {
    defaultIndex: "0",
    className: "test",
    mode: "horizontal",
    onSelect: jest.fn()
}
const testVerticalProps:MenuProps = {
    defaultIndex: "0",
    mode: "vertical"
}

const NiceMenu = (props:MenuProps) => {
    return <Menu {...props}>
        <MenuItem index="0">
        active
        </MenuItem>
        <MenuItem index='1'>
        cool Link1
        </MenuItem>
        <MenuItem index='2' disabled>
        disabled
        </MenuItem>
        <SubMenu title="dropdown">
            <MenuItem>
              drop1
            </MenuItem>
        </SubMenu>
    </Menu>
}   

// dom中加入样式，测试subMenu
const createStyleFile = () => {
    const cssFile: string =`
        .antd-submenu {
            display: none;
        }
        .antd-submenu.menu-opened {
            display: block;
        }
    `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}

let wrapper: RenderResult , menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

// 1.分类cases
describe('test Menu and MenuItem component', () => {
    // 在执行每个case之前都会执行beforeEach钩子
    beforeEach(() => {
        // 模拟真实的用户交互，渲染一个button
        wrapper = render(NiceMenu(testProps));
        // 插入样式
        wrapper.container.append(createStyleFile());
        // 然后通过渲染出来的对象获取文本
        menuElement = wrapper.getByTestId("test-menu");
        activeElement = wrapper.getByText("active");
        disabledElement = wrapper.getByText("disabled");
    });
    test('should render the corret menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        // expect(element.tagName).toEqual('BUTTON');
        expect(menuElement).toHaveClass('antd-menu test');
        // expect(menuElement.getElementsByTagName("li").length).toEqual(3);
        expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    });
    test('click items should change active and call the right callback', () => {
        const secondItem = wrapper.getByText("cool Link1");
        fireEvent.click(secondItem);
        expect(secondItem).toHaveClass("is-active");
        expect(activeElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).toHaveBeenCalledWith("1");

        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass("is-active");
        expect(testProps.onSelect).not.toHaveBeenCalledWith("2");
    });
    test('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(NiceMenu(testVerticalProps));
        const element = wrapper.getByTestId("test-menu");
        expect(element).toHaveClass("menu-vertical");
    });

    // subItem测试用例
    test("should show dropdown items when hover on SubMenu", async () =>{
        expect(wrapper.queryByText("drop1")).not.toBeVisible();
        const dropdownElement = wrapper.getByText("dropdown");

        fireEvent.mouseEnter(dropdownElement);
        await waitFor(()=>{
            expect(wrapper.queryByText("drop1")).toBeVisible();
        });

        fireEvent.click(wrapper.getByText("drop1"));
        expect(testProps.onSelect).toHaveBeenCalledWith("3-0");

        fireEvent.mouseLeave(dropdownElement);
        await waitFor(()=>{
            expect(wrapper.queryByText("drop1")).not.toBeVisible();
        });
    })
});