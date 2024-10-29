import React, { useState } from 'react';
import styled from 'styled-components';

interface Event {
    date: string;
    time: string;
    description: string;
    color?: string;
}

interface EventCardProps {
    event: Event;
    onEdit: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(event);
    };

    return (
        <CardContainer
            color={event.color || "#00796b"}
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Time>{event.time}</Time>
            <Description>{event.description}</Description>
            {showTooltip && (
                <Tooltip>
                    <strong>{event.description}</strong>
                    <div>{event.time}</div>
                </Tooltip>
            )}
        </CardContainer>
    );
};

const CardContainer = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  padding: 5px;
  border-radius: 4px;
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  gap: 5px;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
`;

const Time = styled.div`
  font-size: 12px;
  color: white;
`;

const Description = styled.div`
  font-size: 12px;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
  display: inline-block;
  overflow: hidden;
`;

const Tooltip = styled.div`
  position: absolute;
  top: -10px;
  left: 110%;
  background-color: #333;
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  max-width: 300px;
  white-space: normal;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
    @media (max-width: 768px) {
    display: none;
  }
`;

export default EventCard;
