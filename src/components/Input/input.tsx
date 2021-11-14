import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";

type InputSize = 'lg'|'sm';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>,'size'>{
    disabled?: boolean;
    size?: InputSize;
    className?: string;
    icon?: IconProp;
    prepend?: string|React.ReactElement;
    append?: string|React.ReactElement;
    placeholder?:string;
    onIconClick?:()=>void;
    inputRef?:any;
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input:React.FC<InputProps> = (props)=>{
    // 取出各种属性
    const { disabled, size, className, icon, prepend, append, children, 
        style, placeholder,inputRef,onIconClick, onChange, ...restProps } = props;
    // 根据属性计算classname
    const classes = classNames("antd-input-wrapper", className, {
        'is-disabled': disabled,
        [`input-size-${size}`]: size,
        'input-group': prepend || append,
        'input-group-append': append,
        'input-group-prepend': prepend,
    });
    // 根据属性判断返回不同的节点
    return <div className={classes} style={style}>
        {prepend && <div className="antd-input-group-prepend">{prepend}</div>}
        {icon && <div className="icon-wrapper" onClick={onIconClick} ><Icon icon={icon}/></div>}
        <input placeholder={placeholder} onChange={onChange}
            className="antd-input-inner" ref={inputRef}
            disabled={disabled} {...restProps} />
        {children}
        {append &&  <div className="antd-input-group-append">{append}</div> }
  </div>
}

Input.defaultProps = {
    placeholder: "请输入内容",
    disabled: false,
    size:"lg"
}

export default Input;