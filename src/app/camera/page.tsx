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
import { buttonStyle } from "@/util/buttonStyle";
import { getCurrentObject } from "@/hooks/itemAPI";
import { supabaseClient } from "@/lib/supabase";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { user, error, isLoading } = useUser();

  const [image, setImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [createdAt, setCreatedTime] = useState<Date | null>(null);
  const [switchesAt, setSwitchesAt] = useState<Date | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    const startCamera = async () => {
      try {
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

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [facingMode]);

  useEffect(() => {
    const loadPrompt = async () => {
      try {
        const result = await getCurrentObject();
        setPrompt(result.item);
        setCreatedTime(new Date(result.createdAt));
        setSwitchesAt(new Date(result.switchesAt));
      } catch (err) {
        console.error("Failed to load object:", err);
      }
    };

    loadPrompt();
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg");
    setImage(dataUrl);
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const onPictureSubmit = async () => {
    const timeCompleted = new Date();
    if (image === null) return;
    const base64ImageFile = image.split(",")[1] || image;

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: base64ImageFile,
          mimeType: "image/jpeg",
          prompt,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.result === "true") {
          addEntryToLeaderboard(timeCompleted);
        } else {
          alert("Could not find the object. Try again!");
          setImage(null);
        }
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addEntryToLeaderboard = async (timeCompleted: Date) => {
    if (!user) return null;
    if (!createdAt || !switchesAt) {
      alert("Missing object timing information. Cannot add to leaderboard.");
      return;
    }

    if (createdAt > timeCompleted) {
      alert(
        "Time completed is before the object was created. Not adding to leaderboard.",
      );
      router.push("/camera");
      return;
    }

    const { error } = await supabaseClient.from("users_times").insert({
      name: user.name,
      user_email: user.email,
      completed_time: timeCompleted,
      created_time: createdAt,
    });

    if (error) {
      alert("Error adding entry");
      console.error("Supabase error:", error);
      return;
    }
    router.push("/leaderboard");
  };

  return (
    <AuthWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div
          style={{
            ...buttonStyle,
            zIndex: 2,
            padding: "0px 10px",
            flexDirection: "column",
          }}
        >
          <h1 style={{
            fontSize: 16
          }}>{prompt}</h1>
          <Timer timeLeft={600} camera />
        </div>
        <div
          style={{
            zIndex: 2,
            display: "flex",
            gap: "10px",
            alignItems: "center",
            position: "absolute",
            bottom: "80px",
          }}
        >
          <button style={buttonStyle} onClick={() => router.push("/")}>
            <CiCircleChevLeft size={35} />
          </button>

          <button
            style={buttonStyle}
            onClick={() => {
              if (!image) {
                takePhoto();
              } else {
                setImage(null);
              }
            }}
          >
            {image ? <CiRedo size={35} /> : <CiCamera size={35} />}
          </button>

          <button
            style={buttonStyle}
            onClick={async () => {
              if (!image) {
                switchCamera();
              } else {
                onPictureSubmit();
              }
            }}
          >
            {image ? <CiCircleCheck size={35} /> : <CiUndo size={35} />}
          </button>

          <button
            style={buttonStyle}
            onClick={() => router.push("/leaderboard")}
          >
            <CiTrophy size={35} />
          </button>
        </div>

        <div
          style={{
            width: "95%",
            height: "70%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "30px",
            overflow: "hidden",
            backgroundColor: "black",
          }}
        >
          {!image ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <img
              src={image}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </AuthWrapper>
  );
}
