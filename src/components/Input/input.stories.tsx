import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// 默认导出用来描述组件
export default {
  title: 'Components/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

// export导出用来描述stories
export const Default = Template.bind({});
Default.storyName = "默认Input"
Default.args = {
  
};

export const Disabled = Template.bind({});
Disabled.storyName = "禁用的Input"
Disabled.args = {
  disabled:true
};

export const Size = Template.bind({});
Size.storyName = "不同尺寸的Input"
Size.args = {
  size: 'lg'
};

export const IconInput = Template.bind({});
IconInput.storyName = "带有Icon的Input"
IconInput.args = {
  icon: 'angle-down'
};

export const CompositeInput = Template.bind({});
CompositeInput.storyName = "复合型Input"
CompositeInput.args = {
  prepend: 'Http://',
  append: <div>.com</div>
};