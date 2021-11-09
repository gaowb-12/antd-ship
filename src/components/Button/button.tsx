import React, { ReactNode } from "react";
import classNames from 'classnames';

// button组件的按钮类型
export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}
export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
// button组件的参数属性
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?:string
}
// 继承button按钮原生的一些属性，结合交叉类型添加新属性
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps;
// 继承a标签原生的一些属性，结合交叉类型添加新属性
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps;
// 交叉两种类型,Partial：ts内部的类型，可以将所有的属性变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button:React.FC<ButtonProps> = (props)=>{
    const {
        btnType,
        size,
        className,
        disabled,
        children,
        href,
        ...restProps
    } = props;
    // btn btn-lg btn-primary
    const classes = classNames("btn", className, {
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled':(btnType === ButtonType.Link) && disabled
    });
    if(btnType === ButtonType.Link && href)
        return <a
            className={classes}
            href={href}
            {...restProps}
        >
            {children}
        </a>
    else
        return <button 
            disabled={disabled}
            className={classes}
            {...restProps}
        >
                {children}
            </button>
}
Button.defaultProps = {
    disabled:false,
    btnType: ButtonType.Default
}

export default Button;