'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Flex, Layout, Select } from 'antd';

import { Event } from '@/app/types/Event';
import { LOADING } from '../constants/messages';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
import EventBoard from '../components/EventBoard';

const { Content } = Layout;

export type SortingBy = {
  sort_by: string;
  order_by: string;
};

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [sortingBy, setSortingBy] = useState<SortingBy>({
    sort_by: 'title',
    order_by: 'asc',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getEvents = async (newPage = page, reset = false) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `/api/events?page=${newPage}&sort_by=${sortingBy?.sort_by}&order_by=${sortingBy?.order_by}`
      );

      setTotal(response.data.total);

      if (reset) {
        setEvents(response.data.events);
      } else {
        setEvents((prev) => [...prev, ...response.data.events]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getEvents(1, true);
  }, [sortingBy]);

  const onSortingByChange = (value: string) => {
    const [sort_by, order_by] = value.split('-');
    setSortingBy({ sort_by, order_by });
  };

  return (
    <Layout>
      <Header title='Events' />
      <FilterPanel>
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
      </FilterPanel>
      <Content style={{ padding: '0 48px' }}>
        <EventBoard isLoading={isLoading} events={events} />
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
