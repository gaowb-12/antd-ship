import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Upload } from './upload';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// 默认导出用来描述组件
export default {
  title: 'Components/Upload',
  component: Upload,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    
  },
} as ComponentMeta<typeof Upload>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

// export导出用来描述stories
export const Default = Template.bind({});
Default.storyName = "默认Input"
Default.args = {
  action:"https://jsonplaceholder.typicode.com/posts/",
  // defaultFileList:[
  //   {uid:"12",name:"gao",size:101010,percent:0, },
  //   {uid:"34",name:"wei",size:202020,percent:10, },
  // ],
  onSuccess:(data, file)=>{
    console.log(data)
  },
  onError:(err, file)=>{
    console.log(err)
  },
  beforeUpload:(file)=>{
    console.log(file)
    return true
  },
  onChange:(file)=>{
    console.log(file)
  }
};