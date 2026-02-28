'use client';
import React, { useEffect, useState } from "react";

export type FIBBlank = {
  time: number; 
};

export default function Timer({ timeLeft }: { timeLeft: number }) {
  const [time, setTime] = useState(timeLeft);

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