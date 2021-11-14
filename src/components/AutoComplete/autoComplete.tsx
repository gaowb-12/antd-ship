import React, {useState} from "react";
import Input, { InputProps } from "../Input/input";

// 定义数据类型
interface DataSourceObject{
    value:string;
}
// 定义自定义模板时的数据类型
export type DataSourceType<T = {}> = T & DataSourceObject;

interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    fetchSuggestions: (keyword:string) => DataSourceType[];
    onSelect ?: (item:DataSourceType)=> void;
    renderOptions?: (item:DataSourceType)=> React.ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOptions,
        ...restProps
    } = props;
    
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value);
        if(value){
            const result = fetchSuggestions(value);
            setSuggestions(result)
        }else{
            setSuggestions([])
        }
    }

    const handleClick = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if(onSelect) onSelect(item);
    }
    const renderTemplate = (item: DataSourceType) =>{
        return renderOptions ? renderOptions(item) : item.value;
    }
    const generateDropDown = () => {
        return <ul>
            {suggestions.map((item,index) => {
                return <li key={index} onClick={()=>handleClick(item)}>{renderTemplate(item)}</li>
            })}
        </ul>
    }

    return <div className="antd-auto-complete">
        <Input 
        value={inputValue} 
        {...restProps}
        onChange={handleChange}
        ></Input>
        {suggestions.length>0 && generateDropDown()}
    </div>
}

export default AutoComplete;