import React from "react";
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
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
    href?: string;
}
declare type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps;
declare type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * Button组件
*/
export declare const Button: React.FC<ButtonProps>;
export default Button;
