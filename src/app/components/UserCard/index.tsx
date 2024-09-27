import React from 'react';
import { Card } from 'antd';

import { User } from '@/app/types/User';

const UserCard = ({ data }: { data: User }) => {
  return (
    <Card title={data.full_name} bordered={false} style={{ width: 300 }}>
      <p>{data.email}</p>
    </Card>
  );
};

export default UserCard;
