"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { calculateSecondsRemaining } from "@/hooks/itemAPI";

interface TimerProps {
  switchesAt: string | number | Date;
  camera: boolean;
}

export default function Timer({ switchesAt, camera }: TimerProps) {
  const router = useRouter();
  const [time, setTime] = useState(() => calculateSecondsRemaining(switchesAt));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = calculateSecondsRemaining(switchesAt);
      setTime(remaining);

      if (remaining <= 0) {
        clearInterval(intervalId);
        if (camera) {
          router.push("/");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [switchesAt, camera, router]);

  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-mono text-4xl font-black tracking-tighter text-red-500 ">
        {minutes}:{seconds}
      </p>
      <div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-gray-400">
        <div 
          className="h-full bg-yellow-400 transition-all duration-1000 ease-linear"
          style={{ width: `${Math.min((time / 120) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}