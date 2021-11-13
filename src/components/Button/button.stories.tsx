import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, {} from './button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// 默认导出用来描述组件
export default {
  title: 'Components/Button',
  component: Button,
  // decorators: [
  //   (Story) => (
  //     <div style={{ textAlign: 'center' }}>
  //       <Story/>
  //     </div>
  //   ),
  // ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      options: ['sm', 'lg'],
      control: { type: 'select' }
    },
    btnType: {
      options: ['primary','default','danger','link'],
      control: { type: 'select' }
    },
    disabled: { control:"boolean" },
    onClick: { action: 'clicked' }
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

// export导出用来描述stories

export const Default = Template.bind({});
Default.storyName = "默认Button"
Default.args = {
  disabled:false,
  children: 'Button',
};

export const Size = Template.bind({});
Size.storyName = "不同类型的Button"
Size.args = {
  btnType:'primary',
  children: 'Button'
};

export const BtnType = Template.bind({});
BtnType.storyName = "不同尺寸的Button"
BtnType.args = {
  size: 'lg',
  children: 'Button',
};