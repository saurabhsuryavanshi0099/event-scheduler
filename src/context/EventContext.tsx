import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  saveEvent,
  getEvents,
  deleteEvent as deleteEventFromDB,
} from "../utils/db";

interface Event {
  id?: number;
  date: string;
  time: string;
  description: string;
  color?: string;
}

interface EventContextProps {
  events: Event[];
  addEvent: (event: Event) => void;
  editEvent: (event: Event) => void;
  deleteEvent: (eventId: number) => void;
}
// Creating EventContext for global event state management for entire application

const EventContext = createContext<EventContextProps | undefined>(undefined);

const generateColor = (index: number) => {
  const colors = [
    "rgba(234, 122, 87, 1)",
    "rgba(0, 189, 174, 1)",
    "rgba(53, 124, 210, 1)",
    "rgba(127, 169, 0, 1)",
    "rgba(51, 255, 243, 1)",
  ];
  return colors[index % colors.length];
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const savedEvents = await getEvents();
      setEvents(
        savedEvents.map((event, index) => ({
          ...event,
          color: event.color || generateColor(index),
        }))
      );
    };
    loadEvents();
  }, []);

  const addEvent = async (newEvent: Event) => {
    const color = generateColor(events.length);
    const id = await saveEvent({ ...newEvent, color });
    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, color, id: id as number },
    ]);
  };

  const editEvent = async (updatedEvent: Event) => {
    const existingEvent = events.find((event) => event.id === updatedEvent.id);
    const color = existingEvent?.color || generateColor(events.length);
    await saveEvent({ ...updatedEvent, color });
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? { ...updatedEvent, color } : event
      )
    );
  };

  const deleteEvent = async (eventId: number) => {
    await deleteEventFromDB(eventId);
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

/**
 * Custom hook to use the EventContext in components.
 */

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within EventProvider");
  }
  return context;
};
