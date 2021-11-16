import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
const Welcome: React.FC = ()=>{
    return <div>
        <h1>Welcome</h1>
        <p>
            欢迎来到antd-ship组件库
        </p>
        <p>
            npm install antd-ship --save
        </p>
    </div>
}
// 默认导出用来描述组件
export default {
    title: 'Welcome Page',
    component: Welcome,
    parameters:{
        info:{disabled:true}
    }
} as ComponentMeta<typeof Welcome>;
  
export const Template: ComponentStory<typeof Welcome> = () => <Welcome />;
  