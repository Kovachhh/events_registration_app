'use client';
import { useEffect, useState } from 'react';
import { Button, Col, Empty, Flex, Layout, Row, Select, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

import { Event } from '@/app/types/Event';
import EventCard from '@/app/components/EventCard';
import axios from 'axios';
import { LOADING } from '../constants/messages';

export type SortingBy = {
  sort_by: string;
  order_by: string;
};

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [sortingBy, setSortingBy] = useState<SortingBy | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getEvents = async () => {
    try {
      const response = await axios.get(
        `/api/events?page=${page}&sort_by=${sortingBy?.sort_by}&order_by=${sortingBy?.order_by}`
      );
      setEvents((prev) => [...prev, ...response.data.events]);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortEvents = async () => {
    try {
      const response = await axios.get(
        `/api/events?page=${page}&sort_by=${sortingBy?.sort_by}&order_by=${sortingBy?.order_by}`
      );
      setEvents(response.data.events);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getEvents();
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    sortEvents();
    setIsLoading(false);
  }, [sortingBy]);

  const onSortingByChange = (value: string) => {
    const [sort_by, order_by] = value.split('-');
    setSortingBy({ sort_by, order_by });
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
        <h1>Events</h1>
      </Header>
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
          <Select
            placeholder='Select a sorting by'
            defaultValue='title-asc'
            style={{ minWidth: '150px' }}
            onChange={onSortingByChange}
            options={[
              { value: 'title-asc', label: 'Title (ascending)' },
              {
                value: 'title-desc',
                label: 'Title (descending)',
              },
              {
                value: 'due_date-asc',
                label: 'Event date (ascending)',
              },
              {
                value: 'due_date-desc',
                label: 'Event date (descending)',
              },
              {
                value: 'organizer-asc',
                label: 'Organizer (ascending)',
              },
              {
                value: 'organizer-desc',
                label: 'Organizer (descending)',
              },
            ]}
          />
        </Flex>
      </Content>
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
        {events.length < total && (
          <Flex
            align='center'
            gap='middle'
            justify='center'
            style={{ marginBlock: '24px' }}
          >
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoading}
            >
              {isLoading ? LOADING : 'Load more'}
            </Button>
          </Flex>
        )}
      </Content>
    </Layout>
  );
};

export default EventsPage;
