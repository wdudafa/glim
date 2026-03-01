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

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const router = useRouter();
  const prompt = "pen";

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

          <div
            style={{
              ...buttonStyle,
              padding: "0px 10px",
            }}
          >
            <Timer timeLeft={600} camera />
          </div>

          <button
            style={buttonStyle}
            onClick={async () => {
              if (!image) {
                switchCamera();
              } else {
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
                    console.log(data.result);
                  } else {
                    console.error(data.error);
                  }
                } catch (error) {
                  console.error(error);
                }
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
            width: "50%",
            height: "60%",
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
