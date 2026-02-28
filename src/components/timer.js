'use client';
import React, { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          return 120;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <p style={{ color: 'red', fontWeight: 'bold', fontSize: '24px' }}>
        Time left: {`${Math.floor(time / 60)}`.padStart(2, '0')}:
        {`${time % 60}`.padStart(2, '0')}
      </p>
    </div>
  );
}