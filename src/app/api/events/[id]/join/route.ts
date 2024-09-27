import { NextResponse, NextRequest } from 'next/server';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { STATUS_CODES } from '@/app/constants/enums';
import User from '@/app/models/userModel';
import Event from '@/app/models/eventModel';
import { EVENT_NOT_FOUND } from '@/app/constants/messages';

const schema = {
  type: 'object',
  properties: {
    full_name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    birth_date: { type: 'string' },
    source: { type: 'string' },
  },
  required: ['full_name', 'email', 'birth_date', 'source'],
};

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(schema);

type InputType = {
  params: {
    id: string;
  };
};

export async function PUT(req: NextRequest, { params }: InputType) {
  try {
    const { id: event_id } = params;
    const body = await req.json();

    const { full_name, email, birth_date, source } = body;

    const isValidBody = validate(body);

    if (!isValidBody && validate.errors) {
      console.log(validate.errors);
      return NextResponse.json(
        { message: validate.errors[0] },
        { status: STATUS_CODES.VALIDATION_ERROR }
      );
    }

    const event = await Event.find({ id: event_id }).lean();

    if (!event) {
      return NextResponse.json(
        { message: EVENT_NOT_FOUND },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    const user = await User.create({
      full_name,
      email,
      birth_date: new Date(birth_date).toISOString(),
      source,
      event_id,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error during getting events: ', error);
    return NextResponse.json(
      { message: 'Error during getting events ' + String(error) },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
