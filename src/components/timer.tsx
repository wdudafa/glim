'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function Timer({ timeLeft, camera }: { timeLeft: number, camera: string }) {
  const [time, setTime] = useState(timeLeft);
  const router = useRouter(); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          if (camera) {
            router.push('/'); 
          }
          return 120
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