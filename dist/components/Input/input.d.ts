import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    className?: string;
    icon?: IconProp;
    prepend?: string | React.ReactElement;
    append?: string | React.ReactElement;
    placeholder?: string;
    onIconClick?: () => void;
    inputRef?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const Input: React.FC<InputProps>;
export default Input;
