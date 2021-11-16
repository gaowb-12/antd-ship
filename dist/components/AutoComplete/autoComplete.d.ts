import React from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = (DataSourceObject & T);
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType | any) => React.ReactElement;
}
export declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
