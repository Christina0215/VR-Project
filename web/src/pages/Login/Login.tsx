import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import {
  MobileOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import 'aframe';
import { Entity, Scene } from 'aframe-react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        MozUserSelect: 'none',
        userSelect: 'none',
        msUserSelect: 'none',
        msTouchSelect: 'none',
      }}
    >
      <Scene>
        <Entity primitive="a-sky" src="/vr.jpg" />
      </Scene>
      <div
        style={{
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translateY(-50%) translateX(-50%)',
        }}
      >
        <ProForm
        style={{
            width:330
        }}
          onFinish={async () => {
            await waitTime(2000);
            window.location.href = '/index';
          }}
          submitter={{
            searchConfig: {
              submitText: '登录',
            },
            onSubmit: async () => {
              await waitTime(2000);
              message.success('登陆成功');
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
        >
          <h1
            style={{
              textAlign: 'center',
            }}
          >
            <img
              style={{
                height: '44px',
                marginRight: 16,
              }}
              alt="logo"
              src="/QKteam.png"
            />
            宿舍管理系统
          </h1>
          <div
            style={{
              marginTop: 12,
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
          </div>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: ' 请输入用户名!' },
              {
                pattern: /^2\d{12}$/,
                message: '不合法的用户名格式!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
          </Form.Item>
        </ProForm>
      </div>
    </div>
  );
};
