import React from 'react';
import './AssignmentCard.css';

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="assignment-card">
      <h4>{assignment.title}</h4>
      <p>{assignment.description}</p>
    </div>
  );
};

export default AssignmentCard;
