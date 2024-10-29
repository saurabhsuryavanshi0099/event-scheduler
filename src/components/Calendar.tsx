"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import EventCard from "./EventCard";
import styled from "styled-components";

interface CalendarProps {
  events: { date: string; time: string; description: string; color?: string }[];
  openModal: (
    date: Date,
    eventToEdit?: {
      date: string;
      description: string;
      time: string;
      color?: string;
    }
  ) => void;
}

/**
 * Calendar component to render a grid of days for the selected month.
 * Each day displays any events scheduled on that date.
 */

const Calendar: React.FC<CalendarProps> = ({ events, openModal }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // generates an array of days for the current month
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <CalendarContainer>
      <Header>
        <button onClick={prevMonth}>&#8249;</button>
        <h1>{format(currentMonth, "MMMM yyyy")}</h1>
        <button onClick={nextMonth}>&#8250;</button>
      </Header>
      <Grid>
        {days.map((day, index) => (
          <Day
            key={`${day.toString()}-${index}`}
            onClick={() => openModal(day)}
          >
            <DateLabel>{format(day, "d")}</DateLabel>
            <Events>
              {events
                .filter((event) => event.date === format(day, "yyyy-MM-dd"))
                .map((event, index) => (
                  <EventCard
                    key={`${event.date}-${event.time}-${index}`} // Unique key for each event
                    event={event}
                    onEdit={(eventToEdit) => openModal(day, eventToEdit)}
                  />
                ))}
            </Events>
          </Day>
        ))}
      </Grid>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;

  button {
    background-color: #9b9b9b;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #d7d7d7;
    }
  }

  h1 {
    font-size: 1.5em;
  }

  @media (max-width: 768px) {
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Day = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-width: 180px;
  min-height: 100px;

  @media (max-width: 768px) {
    min-width: 100px;
  }

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;

const DateLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Events = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export default Calendar;
