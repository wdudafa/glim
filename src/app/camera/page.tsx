"use client";
import AuthWrapper from "@/components/AuthWrapper";
import { GoogleGenAI } from "@google/genai";
import { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Timer from "@/components/timer";

export default function CameraPage() {
  const camera = useRef(null);
  const [image, setImage] = useState("");
  const prompt = "pen";
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDNbFmTMgUdo8WAAfTvmZy6yZYm_w3G_AQ",
  });
  const router = useRouter();

  return (
    <AuthWrapper >
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <Timer timeLeft={600}></Timer>
        <div>
          <button
            style={{ padding: 10 }}
            onClick={() => {
              if (camera.current) {
                const photo = camera.current.takePhoto();
                setImage(photo);
              } else {
                setImage("");
              }
            }}
          >
            {image ? "Retake Photo" : "Take Photo"}
          </button>
          <button
            style={{ padding: 10 }}
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
            {image ? "Submit" : "Switch camera"}
          </button>

          <button
            style={{ padding: 10 }}
            onClick={() => {
              router.push("/");
            }}
          >
            Back
          </button>
        </div>
        <div
          style={{
            width: "100%",
            height: "60%",
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
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
