import { NextResponse, NextRequest } from 'next/server';

import { STATUS_CODES } from '@/app/constants/enums';
import { connectMongoDB } from '@/app/utils/db';

import Event from '@/app/models/eventModel';
import User from '@/app/models/userModel';
import { EVENT_NOT_FOUND } from '@/app/constants/messages';

type InputType = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: InputType) {
  try {
    await connectMongoDB();

    const { searchParams } = req.nextUrl;

    const { id } = params;

    const query = searchParams.get('query') || '';

    const event = await Event.findById(id).lean();

    if (!event) {
      return NextResponse.json(
        { message: EVENT_NOT_FOUND },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    let users;

    if (query) {
      const regexQuery = new RegExp(query, 'i');

      users = await User.find({
        event_id: id,
        $or: [{ full_name: regexQuery }, { email: regexQuery }],
      });
    } else {
      users = await User.find({ event_id: id });
    }

    return NextResponse.json({ ...event, users });
  } catch (error) {
    console.error('Error during getting events: ', error);
    return NextResponse.json(
      { message: 'Error during getting events ' + String(error) },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
