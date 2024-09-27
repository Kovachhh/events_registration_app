'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Layout, Tabs } from 'antd';
// import type { TabsProps } from 'antd';
import { useParams } from 'next/navigation';

import { Event } from '@/app/types/Event';
import { User } from '@/app/types/User';
import FilterPanel from '@/app/components/FilterPanel';
import UserBoard from '@/app/components/UserBoard';
import Header from '@/app/components/Header';
import UsersLineChart from '@/app/components/UsersLineChart';
import TabPane from 'antd/es/tabs/TabPane';

const { Content } = Layout;

const EventsPage: React.FC = () => {
  const params = useParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  const getEvent = async (searchQuery = '') => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/events/${params.id}`, {
        params: { query: searchQuery },
      });

      if (!searchQuery) {
        setEvent(response.data);
      }

      setFilteredUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching event data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getEvent(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const onSearchingByChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Layout>
      <Header title={`Event ${event?.title}`} />
      <Content style={{ padding: '12px 48px' }}>
        <Tabs defaultActiveKey='users'>
          <TabPane tab='Users' key='users'>
            {!!event?.users.length && (
              <FilterPanel>
                <Input
                  placeholder='Search...'
                  style={{ minWidth: '150px' }}
                  onChange={onSearchingByChange}
                  value={query}
                />
              </FilterPanel>
            )}
            <Content style={{ padding: '0 48px' }}>
              <UserBoard filteredUsers={filteredUsers} isLoading={isLoading} />
            </Content>
          </TabPane>
          <TabPane tab='Statistics' key='statistics'>
            <UsersLineChart data={event?.widget} />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default EventsPage;
