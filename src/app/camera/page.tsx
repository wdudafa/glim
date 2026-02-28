'use client';
import AuthWrapper from "@/components/AuthWrapper";
import { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CameraPage() {
  const camera = useRef(null);
  const [image, setImage] = useState("");
  const router = useRouter();

  return (
    <AuthWrapper>
      <div>
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
            onClick={() => {
              if (camera.current) {
                camera.current.switchCamera();
              } else {
                // TODO Submit image
              }
            }}
          >
            {image ? "Submit" : "Switch camera"}
          </button>

            <button style={{ padding: 10 }} onClick={() => {router.push('/')}}>Back</button> 

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
