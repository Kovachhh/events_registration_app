import { CronJob } from 'cron';
import { faker } from '@faker-js/faker';
import Event from '../../models/eventModel';
import { NextRequest, NextResponse } from 'next/server';

async function generateFakeEvent() {
  const fakeEvent = new Event({
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    due_date: faker.date.future(),
    organizer: faker.company.name(),
  });

  try {
    await fakeEvent.save();
    console.log('Fake event created:', fakeEvent);
  } catch (error) {
    console.error('Error saving fake event:', error);
  }
}

export async function GET(req: NextRequest) {
  const job = new CronJob(
    '* * * * *', // Запускається щохвилини (змініть на 0 */3 * * * для запуску кожні 3 години)
    async function () {
      await generateFakeEvent();
    },
    null,
    true,
    'Europe/Kyiv'
  );

  job.start();

  return NextResponse.json({
    message: 'Cron job started',
  });
}
