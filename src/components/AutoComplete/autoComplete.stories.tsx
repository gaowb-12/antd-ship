import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AutoComplete, DataSourceType } from './autoComplete';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// 默认导出用来描述组件
export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onSelect:{
        action: 'clicked'
    }
  },
} as ComponentMeta<typeof AutoComplete>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args} />;

// export导出用来描述stories
export const Default = Template.bind({});
Default.storyName = "默认Input"
Default.args = {
    
};
interface GitHubUserProps{
    login:string;
    url:string;
    avatar_url:string;
}
export const AutoCompleteSelect: ComponentStory<typeof AutoComplete> = (args) => {
    const filters = (query: string) => {
        return  fetch(`https://api.github.com/search/users?q=${query}`)
                .then(res =>{
                    return res.json();
                })
                .then(({items}) => {
                    return items.slice(0,10).map((item:any) => {
                        return {value:item.login, ...item}
                    })
                })
    }
    const renderOptions = (item: DataSourceType<GitHubUserProps>): React.ReactElement =>{
        return <>
            <h2>login: {item.value}</h2>
            <p>url: {item.url}</p>
        </>
    }
    return <AutoComplete 
            defaultValue=""
            fetchSuggestions={filters} 
            onSelect={item=>console.log(item)}
            renderOptions={renderOptions}
            />
};
