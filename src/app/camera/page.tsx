"use client";
import AuthWrapper from "@/components/AuthWrapper";
import { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import Link from "next/link";
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
  const camera = useRef<CameraType | null>(null);
  const [image, setImage] = useState("");
  const prompt = "pen";
  const router = useRouter();

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
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            position: "absolute",
            bottom: "80px",
          }}
        >
          <button
            style={buttonStyle}
            onClick={() => {
              router.push("/");
            }}
          >
            <CiCircleChevLeft size={35} />
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              if (camera.current) {
                const photo = camera.current.takePhoto();
                setImage(photo);
              } else {
                setImage("");
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
            <Timer timeLeft={600} camera={true}></Timer>
          </div>

          <button
            style={buttonStyle}
            onClick={async () => {
              if (camera.current) {
                camera.current.switchCamera();
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
                    console.error("API error:", data.error);
                  }
                } catch (error) {
                  console.error("Failed to analyze image:", error);
                }
              }
            }}
          >
            {image ? <CiCircleCheck size={35} /> : <CiUndo size={35} />}
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              router.push("/leaderboard");
            }}
          >
            <CiTrophy size={35} />
          </button>
        </div>
        <div
          style={{
            width: "50%",
            height: "60%",
            zIndex: 1,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "30px",
            overflow: "hidden",
          }}
        >
          {!image ? (
            <Camera
              ref={camera}
              errorMessages={{
                noCameraAccessible: undefined,
                permissionDenied: undefined,
                switchCamera: undefined,
                canvas: undefined,
              }}
            />
          ) : (
            <img
              style={{ width: "100%", height: "100%" }}
              src={image}
              alt="Image preview"
            />
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}
