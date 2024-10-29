"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import styles from "../app/page.module.css";
import { useEventContext } from "../context/EventContext";
import useServiceWorker from "../hooks/useServiceWorker";
import Calendar from "./Calendar";

// Dynamically import the EventModal component to enable lazy loading as we don't need it on first fold

const EventModal = dynamic(() => import("./EventModal"), {
  //   loading: () => <p>Loading...</p>,
  ssr: false,
});

interface Event {
  date: string;
  description: string;
  time: string;
  color?: string;
}
interface EventSchedulerProps {
  initialEvents?: Event[];
}
const EventScheduler: React.FC<EventSchedulerProps> = ({}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const { events } = useEventContext();

  // register service worker for offline capabilities and
  useServiceWorker();

  const openModal = (date: Date, eventToEdit?: Event) => {
    setSelectedDate(format(date, "yyyy-MM-dd"));
    setEventToEdit(eventToEdit || null);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setEventToEdit(null);
  };

  return (
    <div className={styles.container}>
      <h1>Event Scheduler</h1>
      <Calendar events={events} openModal={openModal} />
      {selectedDate && (
        <EventModal
          selectedDate={selectedDate}
          closeModal={closeModal}
          eventToEdit={eventToEdit || undefined}
        />
      )}
    </div>
  );
};
export default EventScheduler;
