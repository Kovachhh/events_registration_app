import { NextResponse, NextRequest } from 'next/server';

import { STATUS_CODES } from '@/app/constants/enums';
import Event from '@/app/models/eventModel';
import { PER_PAGE } from '@/app/constants/constants';
import { INVALID_PAGE } from '@/app/constants/messages';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const sortBy = searchParams.get('sort_by') || 'date';
    const orderBy = searchParams.get('order_by') === 'desc' ? -1 : 1;

    if (!page || isNaN(page)) {
      return NextResponse.json(
        { message: INVALID_PAGE },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const events = await Event.find({})
      .sort({ [sortBy]: orderBy })
      .skip((page - 1) * PER_PAGE)
      .limit(PER_PAGE);

    const total = await Event.countDocuments();

    return NextResponse.json({ events, per_page: PER_PAGE, page, total });
  } catch (error) {
    console.error('Error during getting events: ', error);
    return NextResponse.json(
      { message: 'Error during getting events ' + String(error) },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
