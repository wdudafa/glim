"use client";
import AuthWrapper from "@/components/AuthWrapper";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Timer from "@/components/timer";
import {
  CiCamera,
  CiCircleCheck,
  CiCircleChevLeft,
  CiRedo,
  CiTrophy,
  CiUndo,
} from "react-icons/ci";
import { getCurrentObject } from "@/hooks/itemAPI";
import { supabaseClient } from "@/lib/supabase";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { user } = useUser();

  const [image, setImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [createdAt, setCreatedTime] = useState<Date | null>(null);
  const [switchesAt, setSwitchesAt] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");


  useEffect(() => {
    const startCamera = async () => {
      try {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [facingMode]);

  useEffect(() => {
    const loadPrompt = async () => {
      try {
        const result = await getCurrentObject();
        setPrompt(result.item);
        setCreatedTime(new Date(result.createdAt));
        setSwitchesAt(result.switchesAt.toString());
      } catch (err) {
        console.error("Failed to load object:", err);
      }
    };
    loadPrompt();
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context || !videoRef.current) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setImage(dataUrl);
  };

  const onPictureSubmit = async () => {
    const timeCompleted = new Date();
    if (!image) return;
    const base64ImageFile = image.split(",")[1] || image;

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: base64ImageFile,
          mimeType: "image/jpeg",
          prompt,
        }),
      });

      const data = await response.json();
      if (response.ok && data.result === "true") {
        addEntryToLeaderboard(timeCompleted);
      } else {
        alert("Object not detected. Try again!");
        setImage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addEntryToLeaderboard = async (timeCompleted: Date) => {
    if (!user || !createdAt) return;

    const { error } = await supabaseClient.from("users_times").insert({
      name: user.name,
      user_email: user.email,
      completed_time: timeCompleted,
      created_time: createdAt,
    });

    if (error) {
      console.error("Supabase error:", error);
      return;
    }
    router.push("/leaderboard");
  };

  return (
    <AuthWrapper>
      <div className="relative h-screen w-full bg-black flex flex-col items-center overflow-hidden">
        


        <div className="relative w-full h-full flex items-center justify-center">
          {!image ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="mt-55 absolute top-0 w-full z-10 p-8 pt-12 flex flex-col items-center bg-gradient-to-b from-black/80 to-transparent">
          <h1 className="text-white text-2xl font-black uppercase tracking-tighter mb-2">
            {prompt || "Loading..."}
          </h1>
          {switchesAt && (
            <Timer key={switchesAt} switchesAt={switchesAt} camera={true} />
          )}
        </div>
        <div className="absolute bottom-12 w-full z-10 px-6 flex justify-between items-center max-w-md">
          <button 
            className="p-4 rounded-full bg-zinc-900/80 text-white backdrop-blur-md border border-zinc-700"
            onClick={() => router.push("/")}
          >
            <CiCircleChevLeft size={30} />
          </button>

          <button
            className="p-6 rounded-full bg-white text-black shadow-xl transition-transform active:scale-90"
            onClick={() => (image ? setImage(null) : takePhoto())}
          >
            {image ? <CiRedo size={40} /> : <CiCamera size={40} />}
          </button>

          <button
            className={`p-4 rounded-full backdrop-blur-md border transition-all ${
              image ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-zinc-900/80 border-zinc-700 text-white'
            }`}
            onClick={() => (image ? onPictureSubmit() : setFacingMode(prev => prev === "user" ? "environment" : "user"))}
          >
            {image ? <CiCircleCheck size={30} /> : <CiUndo size={30} />}
          </button>

          <button 
            className="p-4 rounded-full bg-zinc-900/80 text-white backdrop-blur-md border border-zinc-700"
            onClick={() => router.push("/leaderboard")}
          >
            <CiTrophy size={30} />
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </AuthWrapper>
  );
}