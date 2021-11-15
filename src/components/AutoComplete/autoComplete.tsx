import React, {useState, useEffect, useRef} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce"
import useClickOutside from "../../hooks/useClickOutside"

// 定义数据类型
interface DataSourceObject{
    value:string;
}
// 定义自定义模板时的数据类型
export type DataSourceType<T = {}> = (DataSourceObject & T);

interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    fetchSuggestions: (keyword:string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect ?: (item: DataSourceType)=> void;
    renderOptions?: (item: DataSourceType | any)=> React.ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOptions,
        ...restProps
    } = props;
    
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const triggerSearch = useRef(false);
    const comRef = useRef<HTMLDivElement>(null);
    useClickOutside(comRef, ()=>{
        setSuggestions([])
    });

    // 处理函数防抖
    const debouncedValue = useDebounce(inputValue);
    useEffect(() => {
        if(debouncedValue && triggerSearch.current){
            const result = fetchSuggestions(debouncedValue);
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
    }, [debouncedValue]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value);
        triggerSearch.current = true
    }

    const handleClick = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        if(onSelect) onSelect(item);
        triggerSearch.current = false;
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

    return <div className="antd-auto-complete" ref={comRef}>
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