import React from 'react';

const AgeDisplay = ({ age, dayOfWeek }) => {
  return (
    <div>
      <h2>Age Information</h2>
      {age !== null && dayOfWeek !== null ? (
        <div>
          <p>Your age is: {age} years old.</p>
          <p>Day of the week of birth: {dayOfWeek}</p>
        </div>
      ) : (
        <p>Age information will be displayed here once calculated.</p>
      )}
    </div>
  );
};

export default AgeDisplay;
