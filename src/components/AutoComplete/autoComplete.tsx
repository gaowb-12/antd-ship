import React, {useState} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";

// 定义数据类型
interface DataSourceObject{
    value:string;
}
// 定义自定义模板时的数据类型
export type DataSourceType<T = {}> = (DataSourceObject & T);

interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    fetchSuggestions: (keyword:string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect ?: (item: DataSourceType)=> void;
    renderOptions?: <T>(item: DataSourceType<T>)=> React.ReactElement;
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
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value);
        if(value){
            const result = fetchSuggestions(value);
            setLoading(true)
            if(result instanceof Promise)
                result.then(r => {
                    setLoading(false)
                    return setSuggestions(r)
                });
            else setSuggestions(result);
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
        {loading && <Icon icon="spinner" spin />}
        {suggestions.length>0 && generateDropDown()}
    </div>
}

export default AutoComplete;