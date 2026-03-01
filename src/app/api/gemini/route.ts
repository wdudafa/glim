import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_API_KEY" },
      { status: 500 },
    );
  }

  try {
    const { imageData, mimeType, prompt } = await req.json();

    const ai = new GoogleGenAI({
      apiKey,
    });

    const contents = [
      {
        inlineData: {
          mimeType,
          data: imageData,
        },
      },
      {
        text: `Replying using either true or false, would you say that this image is a photo of ${prompt}`,
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
