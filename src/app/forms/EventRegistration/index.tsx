import { Button, DatePicker, Form, FormInstance, Input, Radio } from 'antd';

import { CUSTOM } from '@/app/constants/messages';
import { generateCustomMessage } from '@/app/helpers/func';
import { User } from '@/app/types/User';

type EventRegistrationFormProps = {
  form: FormInstance;
  joinEvent: (data: User) => void;
};

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  form,
  joinEvent,
}) => {
  return (
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
              message: generateCustomMessage(CUSTOM.FIELD_IS_REQUIRED, 'Email'),
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
  );
};

export default EventRegistrationForm;
