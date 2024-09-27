// lib/cronTask.js
import { CronJob } from 'cron';
import { faker } from '@faker-js/faker';
import Event from '../models/eventModel';

async function generateFakeEvent() {
  const fakeEvent = await Event.create({
    title: faker.lorem.words(2),
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

export function generateEvents() {
  const job = new CronJob(
    // '0 */3 * * *',
    '* * * * *',
    async function () {
      await generateFakeEvent();
    },
    null,
    true,
    'Europe/Kyiv'
  );

  job.start();
  console.log('Cron job for generating fake events is running.');
}
