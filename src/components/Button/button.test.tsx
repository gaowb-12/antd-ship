import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonSize, ButtonType, ButtonProps} from "./button"

// 模拟点击
const defaultProps = {
    onClick:jest.fn()
}
const testProps:ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className:"klass"
};
const aLinkProps:ButtonProps = {
    btnType: ButtonType.Link,
    href:"http://www.baidu.com"
};
const disabledProps:ButtonProps = {
    disabled:true,
    onClick:jest.fn()
};

// 1.分类cases
describe('test Button component', () => {
    test('should render the corret default button', () => {
        // 模拟真实的用户交互，渲染一个button
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);
        // 然后通过渲染出来的对象获取文本
        const element = wrapper.getByText("Nice");
        // 判断文本是否存在
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        // 增加点击事件的case
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
    it('should render the corret component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.getByText("Nice");
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass("btn-primary btn-lg klass");
    });
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button {...aLinkProps}>link</Button>);
        const element = wrapper.getByText("link");
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass("btn-link");
    });
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>disabled</Button>);
        const element = wrapper.getByText("disabled") as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element.disabled).toBeTruthy();

        // 增加点击事件的case
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
})