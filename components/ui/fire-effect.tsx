import React from 'react';

const FireEffect = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="fire-container">
      {particles.map((_, i) => (
        <div key={i} className="particle"></div>
      ))}
    </div>
  );
};

export default FireEffect;
