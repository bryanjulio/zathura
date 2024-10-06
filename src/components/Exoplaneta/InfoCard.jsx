// src/InfoCard.jsx

import React from 'react';

function InfoCard({ title, content }) {
  const cardStyle = {
    backgroundColor: 'rgb(24, 24, 27)',
    color: 'white',
    padding: '1em',
    borderRadius: '8px',
    maxWidth: '300px',
  };

  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

export default InfoCard;
