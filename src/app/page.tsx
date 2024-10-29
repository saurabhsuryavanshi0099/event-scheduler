import EventScheduler from '../components/EventScheduler';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    next: { revalidate: 60 },
  });
  const initialEvents = await res.json();
  console.log('initialEvents',initialEvents);
  return <EventScheduler initialEvents={initialEvents} />;
}
