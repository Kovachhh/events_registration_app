'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Layout } from 'antd';
import { useParams, useRouter } from 'next/navigation';

import { LOADING } from '@/app/constants/messages';
import { Event } from '@/app/types/Event';
import { User } from '@/app/types/User';
import EventRegistrationForm from '@/app/forms/EventRegistration';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);

  const getEvent = async () => {
    const response = await axios.get(`/api/events/${params.id}`);
    setEvent(response.data);
  };

  useEffect(() => {
    getEvent();
  }, []);

  const joinEvent = async (data: User) => {
    try {
      const result = await axios.put(`/api/events/${params.id}/join`, {
        ...data,
      });

      if (result.status === 200) {
        redirectToEvents();
      }
    } catch (error) {
      console.error('Error during joining an event', error);
    }
  };

  const redirectToEvents = () => {
    router.push('/events');
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
      <Content style={{ padding: '0 48px' }}>
        <EventRegistrationForm form={form} joinEvent={joinEvent} />
      </Content>
    </Layout>
  );
};

export default App;
