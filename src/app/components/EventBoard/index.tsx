import { Col, Empty, Flex, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Event } from '@/app/types/Event';
import EventCard from '../EventCard';

type EventBoardProps = {
  isLoading: boolean;
  events: Event[];
};

const EventBoard: React.FC<EventBoardProps> = ({ isLoading, events }) => {
  return (
    <div style={{ padding: '24px' }}>
      {isLoading ? (
        <Flex align='center' gap='middle' justify='center'>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      ) : (
        <Row gutter={[64, 32]} justify='center'>
          {' '}
          {!!events.length ? (
            events.map((item, index) => (
              <Col xs={24} sm={14} md={10} lg={6} key={index}>
                {' '}
                <EventCard data={item} />
              </Col>
            ))
          ) : (
            <Empty />
          )}
        </Row>
      )}
    </div>
  );
};

export default EventBoard;
