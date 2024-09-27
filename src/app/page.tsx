'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const runCron = async () => {
      await fetch('/api/cron');
    };

    runCron();
    // redirect('/events');
  });
  return <div></div>;
}
