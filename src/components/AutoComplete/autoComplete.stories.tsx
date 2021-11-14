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

export const AutoCompleteSelect: ComponentStory<typeof AutoComplete> = (args) => {
    const lakers = [
        { value:'caruso', number:10 },
        { value:'cook', number:10 },
        { value:'green', number:10 },
        { value:'AD', number:10 },
        { value:'james', number:10 },
        { value:'howard', number:10 },
        { value:'kuzma', number:10 },
        { value:'rando', number:10 }
    ];
    const filters = (query: string) => {
        return lakers.filter(item=>{
            return item.value.includes(query);
        });
    }
    const renderOptions = (item:DataSourceType): React.ReactElement =>{
        return <h2>Name: {item. value}</h2>
    }
    return <AutoComplete 
            defaultValue="aaa"
            fetchSuggestions={filters} 
            onSelect={item=>console.log(item)}
            renderOptions={renderOptions}
            />
};
