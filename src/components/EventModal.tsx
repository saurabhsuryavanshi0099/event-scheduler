"use client";

import { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";
import styled from "styled-components";

interface EventModalProps {
  selectedDate: string;
  closeModal: () => void;
  eventToEdit?: {
    id?: number;
    date: string;
    description: string;
    time: string;
  };
}
// Renders a modal allowing users to add or edit events for respected date.

const EventModal: React.FC<EventModalProps> = ({
  selectedDate,
  closeModal,
  eventToEdit,
}) => {
  const { addEvent, editEvent, deleteEvent } = useEventContext();
  const [description, setDescription] = useState<string>("");
  const [time, setTime] = useState<string>("12:00");

  useEffect(() => {
    if (eventToEdit) {
      setDescription(eventToEdit.description);
      setTime(eventToEdit.time);
    }
  }, [eventToEdit]);

  const handleSubmit = () => {
    if (description && time) {
      const newEvent = {
        id: eventToEdit?.id,
        date: selectedDate,
        description,
        time,
      };
      if (eventToEdit) {
        editEvent(newEvent);
      } else {
        addEvent(newEvent);
      }
      closeModal();
    }
  };

  const handleDelete = () => {
    if (eventToEdit && eventToEdit.id) {
      deleteEvent(eventToEdit.id); // Call deleteEvent with the current event's id
      closeModal();
    } else {
      console.error("Failed to delete: event ID is missing.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <TitleInput
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add title"
        />
        <EventDate>
          <CalendarIcon>📅</CalendarIcon>
          {selectedDate}
        </EventDate>
        <TimeSection>
          <label>
            Event Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </TimeSection>
        <ButtonSection>
          {eventToEdit && (
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          )}
          <SaveButton onClick={handleSubmit}>
            {eventToEdit ? "Save Changes" : "Add Event"}
          </SaveButton>
        </ButtonSection>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  padding-top: 40px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 480px) {
    width: 300px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #aaa;
  &:hover {
    color: #333;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 1rem;
  gap: 8px;
`;

const CalendarIcon = styled.span`
  font-size: 1.2rem;
`;

const TimeSection = styled.div`
  margin-top: 10px;
  label {
    font-size: 1rem;
    color: #666;
  }
  input[type="time"] {
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background: none;
  color: #ff4d4f;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: #ff1a1a;
  }
`;

const SaveButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

export default EventModal;
