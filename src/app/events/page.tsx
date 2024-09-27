'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Select } from 'antd';

import { Event } from '@/app/types/Event';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getEvents = async (newPage = page) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `/api/events?page=${newPage}&sort_by=${sortingBy?.sort_by}&order_by=${sortingBy?.order_by}`
      );

      setTotal(response.data.total);

      if (newPage === 1) {
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
    setPage(1);
    getEvents(1);
  }, [sortingBy]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!isLoading && events.length < total) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [events, isLoading, total]);

  useEffect(() => {
    if (page > 1) {
      getEvents(page);
    }
  }, [page]);

  const onSortingByChange = (value: string) => {
    const [sort_by, order_by] = value.split('-');
    setSortingBy({ sort_by, order_by });
  };

  return (
    <Layout>
      <Header title='Events' />
      <Content style={{ paddingInline: '32px' }}>
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
      </Content>
      <Content style={{ padding: '0 48px' }}>
        <EventBoard isLoading={isLoading} events={events} />
      </Content>
    </Layout>
  );
};

export default EventsPage;
