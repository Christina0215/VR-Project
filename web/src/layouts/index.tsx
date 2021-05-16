import React, { useState } from 'react';
import { Avatar, Switch } from 'antd';
import { UserOutlined, createFromIconfontCN } from '@ant-design/icons';
import { history, Link } from 'umi';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, {
  PageContainer,
  SettingDrawer,
} from '@ant-design/pro-layout';
import defaultProps from './defaultprops';

export default (props) => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2545519_tokss7b88ni.js',
  });
  const [pathname, setPathname] = useState('/welcome');
  const [style, setStyle] = useState('light');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        userSelect: 'none',
        msUserSelect: 'none',
        MozUserSelect: 'none',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        fixedHeader={true}
        navTheme={style}
        headerTheme={style}
        layout="mix"
        onMenuHeaderClick={() => history.push('/index')}
        menuItemRender={(item, dom) => {
          if (
            item.isUrl ||
            !item.path ||
            location.pathname === item.path
          ) {
            return dom;
          }
          return <Link to={item.path}>{dom}</Link>;
        }}
        rightContentRender={() => (
          <div>
            <Switch
              checkedChildren={<IconFont type="icon-Taiyang" />}
              unCheckedChildren={<IconFont type="icon-yueliang" />}
              defaultChecked={true}
              style={{
                transform: 'translateX(-50%)',
              }}
              size="default"
              onChange={() => {
                if (style === 'light') setStyle('dark');
                else setStyle('light');
              }}
            />
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >{ props.children }</ProLayout>
    </div>
  );
};
