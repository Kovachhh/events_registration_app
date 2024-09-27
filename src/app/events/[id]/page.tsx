'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Empty, Flex, Input, Layout, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';

import { Event } from '@/app/types/Event';
import UserCard from '@/app/components/UserCard';
import { LOADING } from '@/app/constants/messages';
import { User } from '@/app/types/User';

const { Header, Content } = Layout;

const EventsPage: React.FC = () => {
  const params = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const getEvent = async () => {
    const response = await axios.get(`/api/events/${params.id}`);
    setEvent(response.data);
    setIsLoading(false);
  };

  const getFilteredEvent = async () => {
    const response = await axios.get(`/api/events/${params.id}?query=${query}`);
    setFilteredUsers(response.data.users);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getEvent();
    setIsLoading(false);
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    getFilteredEvent();
    setIsLoading(false);
  }, [query]);

  const onSearchingByChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Layout>
      <Header
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
        <h1>{`Event ${event?.title || LOADING}`}</h1>
      </Header>
      {!!event?.users.length ? (
        <Content style={{ padding: '16px 68px' }}>
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
            <Input
              placeholder='Search...'
              style={{ minWidth: '150px' }}
              onChange={onSearchingByChange}
              value={query}
            />
          </Flex>
        </Content>
      ) : null}
      <Content style={{ padding: '0 48px' }}>
        <div style={{ padding: '24px' }}>
          {isLoading ? (
            <Flex align='center' gap='middle' justify='center'>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            </Flex>
          ) : (
            <Row gutter={[64, 32]} justify='center'>
              {' '}
              {!!filteredUsers.length ? (
                event?.users.map((item) => (
                  <Col xs={24} sm={14} md={10} lg={6} key={item._id}>
                    {' '}
                    <UserCard data={item} />
                  </Col>
                ))
              ) : (
                <Empty />
              )}
            </Row>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default EventsPage;
