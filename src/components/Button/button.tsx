import React from "react";
import classNames from 'classnames';

// button组件的按钮类型
export type ButtonSize = 'lg'|'sm';
export type ButtonType = 'primary'|'default'|'danger'|'link';
// button组件的参数属性
interface BaseButtonProps {
    /** 设置Button的类名 */
    className?: string;
    /** 设置Button的禁用 */
    disabled?: boolean;
    /** 设置Button的尺寸 */
    size?: ButtonSize;
    /** 设置Button的类型 */
    btnType?: ButtonType;
    /** 设置Button的子节点 */
    children: React.ReactNode;
    /** a链接Button */
    href?:string;
}
// 继承button按钮原生的一些属性，结合交叉类型添加新属性
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps;
// 继承a标签原生的一些属性，结合交叉类型添加新属性
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps;
// 交叉两种类型,Partial：ts内部的类型，可以将所有的属性变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * Button组件
*/
export const Button: React.FC<ButtonProps> = (props)=>{
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
        'disabled':(btnType === 'link') && disabled
    });
    if(btnType === 'link' && href)
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
    btnType: "default"
}

export default Button;