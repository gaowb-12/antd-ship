var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from "react";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOptions"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var triggerSearch = useRef(false);
    var comRef = useRef(null);
    useClickOutside(comRef, function () {
        setSuggestions([]);
    });
    // 处理函数防抖
    var debouncedValue = useDebounce(inputValue);
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var result = fetchSuggestions(debouncedValue);
            setLoading(true);
            if (result instanceof Promise)
                result.then(function (r) {
                    setLoading(false);
                    return setSuggestions(r);
                });
            else
                setSuggestions(result);
        }
        else {
            setSuggestions([]);
        }
    }, [debouncedValue]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleClick = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect)
            onSelect(item);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var generateDropDown = function () {
        return React.createElement("ul", null, suggestions.map(function (item, index) {
            return React.createElement("li", { key: index, onClick: function () { return handleClick(item); } }, renderTemplate(item));
        }));
    };
    return React.createElement("div", { className: "antd-auto-complete", ref: comRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange })),
        loading && React.createElement(Icon, { icon: "spinner", spin: true }),
        suggestions.length > 0 && generateDropDown());
};
export default AutoComplete;
