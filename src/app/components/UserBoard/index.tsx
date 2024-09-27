import { Col, Empty, Flex, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import UserCard from '../UserCard';
import { User } from '@/app/types/User';

type UserBoardProps = {
  isLoading: boolean;
  filteredUsers: User[];
};

const UserBoard: React.FC<UserBoardProps> = ({ isLoading, filteredUsers }) => {
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[64, 32]} justify='start'>
        {!!filteredUsers.length &&
          filteredUsers.map((item) => (
            <Col xs={24} sm={14} md={10} lg={6} key={item._id}>
              {' '}
              <UserCard data={item} />
            </Col>
          ))}
        {!isLoading && !filteredUsers.length && <Empty />}
        {isLoading && (
          <Flex align='center' gap='middle' justify='center'>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </Flex>
        )}
      </Row>
    </div>
  );
};

export default UserBoard;
