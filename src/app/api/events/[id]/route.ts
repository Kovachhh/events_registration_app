import { NextResponse, NextRequest } from 'next/server';

import { STATUS_CODES } from '@/app/constants/enums';
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

    const usersGroupedByCreatedAt: { [key: string]: number } = {}; // Ключі - дати, значення - кількість

    users.forEach((user) => {
      const date = user.createdAt.toISOString().split('T')[0]; // Отримуємо тільки дату без часу
      usersGroupedByCreatedAt[date] = (usersGroupedByCreatedAt[date] || 0) + 1; // Збільшуємо лічильник для кожної дати
    });

    return NextResponse.json({
      ...event,
      users,
      widget: usersGroupedByCreatedAt,
    });
  } catch (error) {
    console.error('Error during getting events: ', error);
    return NextResponse.json(
      { message: 'Error during getting events ' + String(error) },
      { status: STATUS_CODES.INTERNAL_SERVER_ERROR }
    );
  }
}
