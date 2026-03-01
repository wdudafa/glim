"use client";
import AuthWrapper from "@/components/AuthWrapper";
import { GoogleGenAI } from "@google/genai";
import { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
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

export default function CameraPage() {
  const camera = useRef(null);
  const [image, setImage] = useState("");
  const prompt = "pen";
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAnqPkQhm92x-486yRx4ypQO4_5btmYnxc",
  });
  const router = useRouter();

  const buttonStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80px",
    height: "80px",
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
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            position: "absolute",
            bottom: "100px",
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
              padding: "10px",
              borderRadius: 30,
              border: "none",
              backgroundColor: "#ffffff",
              cursor: "pointer",
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Timer timeLeft={600} camera="true"></Timer>
          </div>

          <button
            style={buttonStyle}
            onClick={async () => {
              if (camera.current) {
                camera.current.switchCamera();
              } else {
                const base64ImageFile = image.split(",")[1] || image;

                const contents = [
                  {
                    inlineData: {
                      mimeType: "image/jpeg",
                      data: base64ImageFile,
                    },
                  },
                  {
                    text: `Replying using either true of false, would you say that this image is a photo of ${prompt}`,
                  },
                ];

                const response = await ai.models.generateContent({
                  model: "gemini-3-flash-preview",
                  contents: contents,
                });
                console.log(response.text);
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
