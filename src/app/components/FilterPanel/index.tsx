import React from 'react';
import { Flex, Layout } from 'antd';

const { Content } = Layout;

type FilterPanelProps = {
  children: React.ReactNode;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ children }) => {
  return (
    <Content style={{ padding: '16px 0' }}>
      <Flex
        align='center'
        gap='middle'
        style={{
          padding: '12px',
          borderRadius: '8px',
          background: '#eeeeee',
          boxShadow: '0 3px 13px #b1b5bd1a',
        }}
      >
        {children}
      </Flex>
    </Content>
  );
};

export default FilterPanel;
