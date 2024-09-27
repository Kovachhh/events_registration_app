'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Radio, Layout, DatePicker } from 'antd';
import { useParams, useRouter } from 'next/navigation';

import { CUSTOM, LOADING } from '@/app/constants/messages';
import { Event } from '@/app/types/Event';
import { User } from '@/app/types/User';
import { generateCustomMessage } from '@/app/helpers/func';

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
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          <h2>Event registration</h2>
          <Form
            layout='vertical'
            form={form}
            style={{ maxWidth: 400 }}
            onFinish={joinEvent}
          >
            <Form.Item
              label='Full name'
              name='full_name'
              rules={[
                {
                  required: true,
                  message: generateCustomMessage(
                    CUSTOM.FIELD_IS_REQUIRED,
                    'Full name'
                  ),
                },
              ]}
            >
              <Input placeholder='Enter a full name' />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: generateCustomMessage(
                    CUSTOM.FIELD_IS_REQUIRED,
                    'Email'
                  ),
                },
              ]}
            >
              <Input placeholder='Enter an email' />
            </Form.Item>
            <Form.Item
              label='Date of birth'
              name='birth_date'
              rules={[
                {
                  required: true,
                  message: generateCustomMessage(
                    CUSTOM.FIELD_IS_REQUIRED,
                    'Date of birth'
                  ),
                },
              ]}
            >
              <DatePicker
                placeholder='Select a date of birth'
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label='Where did you hear about this event?'
              name='source'
              rules={[
                {
                  required: true,
                  message: generateCustomMessage(
                    CUSTOM.FIELD_IS_REQUIRED,
                    'Source'
                  ),
                },
              ]}
            >
              <Radio.Group>
                <Radio value='social_media'>Social media</Radio>
                <Radio value='friends'>Friends</Radio>
                <Radio value='found_yourself'>Found yourself</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Join
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default App;
