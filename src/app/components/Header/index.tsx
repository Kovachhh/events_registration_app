import { Layout } from 'antd';

import { LOADING } from '@/app/constants/messages';

const { Header: AntdHeader } = Layout;

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AntdHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <h1>{`${title || LOADING}`}</h1>
    </AntdHeader>
  );
};

export default Header;
