import React from 'react';
import { Card, Button, Divider } from 'antd';
import { useRouter } from 'next/navigation';

import { Event } from '@/app/types/Event';

const EventCard = ({ data }: { data: Event }) => {
  const router = useRouter();

  return (
    <Card title={data.title} bordered={false} style={{ width: 300 }}>
      <p>{data.description}</p>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type='link'
          onClick={() => router.push(`events/${data._id}/join`)}
        >
          Register
        </Button>
        <Button type='link' onClick={() => router.push(`events/${data._id}`)}>
          View
        </Button>
      </div>
    </Card>
  );
};

export default EventCard;
